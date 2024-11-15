from typing import Union
from backend.db import open_connection, close_connection
from backend.func import log_login_attempt, create_jwt_token, verify_jwt_token, get_username
from blockchain import blockchain
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
        query = "SELECT id, password FROM users WHERE username = $1"
        result = await conn.fetchrow(query, cred.username)

        if result:
            # Compare the stored hashed password with the input password
            stored_password_hash = result['password']
            user_id = result['id']
            if bcrypt.checkpw(cred.password.encode('utf-8'), stored_password_hash.encode('utf-8')):
                # Generate JWT token for the user
                token, valid_to = create_jwt_token(cred.username, SECRET_KEY=SECRET_KEY, ALGORITHM=ALGORITHM)
                # Log the successful login attempt
                await log_login_attempt(conn, cred.username, success=True)
                # Send the JWT and user ID to the frontend
                return {"token": token, "user_id": user_id, "valid_to": valid_to.isoformat()}
            else:
                # Log the failed login attempt
                await log_login_attempt(conn, cred.username, success=False, error_message="Invalid password")
                raise HTTPException(status_code=401, detail="Invalid password")
        else:
            # Log the failed login attempt
            await log_login_attempt(conn, cred.username, success=False, error_message="User not found")
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        # Log the error in case of an exception
        await log_login_attempt(conn, cred.username, success=False, error_message=str(e))
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
        query = "SELECT username FROM users WHERE username = $1"
        existing_user = await conn.fetchrow(query, cred.username)
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        # Hash the password before storing
        hashed_password = bcrypt.hashpw(cred.password.encode('utf-8'), bcrypt.gensalt())

        # Insert new user into the database
        query = """
        INSERT INTO users (id, username, password, email, DOB) 
        VALUES ($1, $2, $3, $4, $5)
        """
        user_id = str(uuid.uuid4())
        await conn.execute(query, user_id, get_username(), hashed_password.decode('utf-8'), cred.email, cred.DOB)

        return {"message": "User created successfully", "status": True}
    except Exception as e:
        print(e)
        return HTTPException(status_code=500, detail=f"Error: {str(e)}")
    finally:
        # Close the database connection
        await close_connection(conn)

@app.post("/profile/{id}")
async def profile(id: int, authorization: str = Depends(verify_jwt_token(SECRET_KEY=SECRET_KEY, ALGORITHM=ALGORITHM))):
    # Get the database connection
    conn = await open_connection()
    try:
        # Query to get user profile by id
        query = "SELECT * FROM users WHERE id = $1"
        result = await conn.fetchrow(query, id)

        if result:
            # Ensure the user is authenticated to view this profile
            if result['username'] != authorization:
                raise HTTPException(status_code=403, detail="You do not have permission to view this profile")
            
            return {
                "id": result['id'],
                "username": result['username'],
                "email": result['email'],
                "DOB": result['DOB'],
                
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
        blockchain.register_node(address)
        return {"message": "Node registered successfully", "nodes": list(blockchain.nodes)}
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
    transaction_index = blockchain.add_transaction(
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
    last_block = blockchain.last_block
    proof = blockchain.proof_of_work(last_block['proof'] if last_block else 100)
    previous_hash = blockchain.hash(last_block) if last_block else "1"
    block = blockchain.new_block(proof, previous_hash)
    return {"message": "New block mined", "block": block}