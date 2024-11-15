from typing import Union
from backend.db import open_connection, close_connection
from backend.func import log_login_attempt, create_jwt_token, verify_jwt_token
from blockchain.blockchain import RecycleChain
import bcrypt
from fastapi import FastAPI, HTTPException, Depends
import uuid
import httpx
import os
import jwt
from backend.models import UserLoginCred, UserSignUpCred, UserLog
from blockchain.blockchain import RecycleChain, TransactionModel
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
# Secret key for JWT (use a more secure method in production)
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/login")
async def login(cred: UserLoginCred):
    # Get the database connection
    conn = await open_connection()
    try:
        # Query to get user from the database
        query = "SELECT id, password FROM users WHERE email = $1"
        result = await conn.fetchrow(query, cred.email)

        if result:
            # Compare the stored hashed password with the input password
            stored_password_hash = result['password']
            user_id = result['id']
            if bcrypt.checkpw(cred.password.encode('utf-8'), stored_password_hash.encode('utf-8')):
                # Generate JWT token for the user
                token, valid_to = create_jwt_token(cred.email, SECRET_KEY=SECRET_KEY, ALGORITHM=ALGORITHM)
                # Log the successful login attempt
                await log_login_attempt(conn, cred.email, success=True, token=token)
                # Send the JWT and user ID to the frontend
                return {"token": token, "user_id": user_id, "valid_to": valid_to.isoformat()}
            else:
                # Log the failed login attempt
                raise HTTPException(status_code=401, detail="Invalid password")
        else:
            # Log the failed login attempt
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        # Log the error in case of an exception
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    finally:
        # Close the database connection
        await close_connection(conn)

@app.post("/signup")
async def signup(cred: UserSignUpCred):
    # Get the database connection
    conn = await open_connection()
    try:
        
        # Check if user already exists
        await conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                DOB VARCHAR(255) NOT NULL
            );
            """
        )
        
        query = "SELECT email FROM users WHERE email = $1"
        existing_user = await conn.fetchrow(query, cred.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="email already exists")

        # Hash the password before storing
        hashed_password = bcrypt.hashpw(cred.password.encode('utf-8'), bcrypt.gensalt())

        # Insert new user into the database
        query = """
        INSERT INTO users (password, email, DOB) 
        VALUES ($1, $2, $3)
        """
        await conn.execute(query, hashed_password.decode('utf-8'), cred.email, cred.DOB)

        return {"message": "User created successfully", "status": True}
    except Exception as e:
        print(e)
        return HTTPException(status_code=500, detail=f"Error: {str(e)}")
    finally:
        # Close the database connection
        await close_connection(conn)

# Main route for user profile
@app.post("/profile/{id}")
async def profile(
    id: int,
    user_id: int = Depends(verify_jwt_token),  # Get the user ID from token verification
):
    # Get the database connection
    conn = await open_connection()
    try:
        # Query to get user profile by ID
        query = "SELECT * FROM users WHERE id = $1"
        result = await conn.fetchrow(query, id)

        if result:
            # print(result)
            # Ensure the user is authorized to view this profile
            if result['id'] != user_id:
                raise HTTPException(
                    status_code=403,
                    detail="You do not have permission to view this profile",
                )
            
            return {
                "id": result['id'],
                "email": result['email'],
                "DOB": result['dob'],
            }
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    finally:
        # Close the database connection
        await close_connection(conn)


@app.post("/register_node/")
async def register_node(address: str):
    """
    Register a new node on the blockchain network.

    Args:
        address (str): The URL or address of the new node to register.

    Returns:
        dict: A message indicating the node was registered successfully and a list of all registered nodes.
    """
    try:
        RecycleChain.register_node(address)
        return {"message": "Node registered successfully", "nodes": list(RecycleChain.nodes)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/create_transaction/")
async def create_transaction(transaction: TransactionModel):
    """
    Create a new transaction on the blockchain.

    Args:
        transaction (TransactionModel): A Pydantic model containing the details of the new transaction.

    Returns:
        dict: A message indicating the transaction will be added to the next block.
    """
    transaction_index = RecycleChain.add_transaction(
        sender=transaction.sender,
        recipient=transaction.recipient,
        ewaste_items=transaction.ewaste_items,
        transaction_type=transaction.transaction_type,
        status=transaction.status,
    )
    return {"message": f"Transaction will be added to block {transaction_index}"}

@app.post("/mine_block/")
async def mine_block():
    """
    Mine a new block and add it to the blockchain.

    Returns:
        dict: A message indicating a new block was mined and the details of the new block.
    """
    last_block = RecycleChain.last_block
    proof = RecycleChain.proof_of_work(last_block['proof'] if last_block else 100)
    previous_hash = RecycleChain.hash(last_block) if last_block else "1"
    block = RecycleChain.new_block(proof, previous_hash)
    return {"message": "New block mined", "block": block}