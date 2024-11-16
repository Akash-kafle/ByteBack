from typing import Union
from backend.db import open_connection, close_connection
from backend.func import log_login_attempt, create_jwt_token, verify_jwt_token
from blockchain.blockchain import RecycleChain
from pydantic import BaseModel
from .db import open_connection, close_connection
from .func import log_login_attempt, create_jwt_token, verify_jwt_token
import bcrypt
from fastapi import FastAPI, HTTPException, Depends, Response
from blockchain.blockchain import EWasteStatus
from pydantic import BaseModel
import uuid
import httpx
import os
import jwt
from backend.models import UserLoginCred, UserSignUpCred, UserLog
from blockchain.blockchain import RecycleChain, TransactionModel, EWasteStatus, EWasteItem
from .models import UserLoginCred, UserSignUpCred, UserLog
from blockchain.blockchain import RecycleChain, TransactionModel
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
# Secret key for JWT (use a more secure method in production)
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"

app = FastAPI()
recycle = RecycleChain()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Pydantic models for request/response validation
class NodeRegistration(BaseModel):
    address: str

class EWasteItemCreate(BaseModel):
    item_id: str
    type: str
    weight: float
    components: list[str]
    manufacturer: str
    year: int

class TransactionCreate(BaseModel):
    sender: str
    recipient: str
    ewaste_items: list[EWasteItemCreate]
    transaction_type: str
    status: EWasteStatus

class BlockResponse(BaseModel):
    index: int
    timestamp: float
    transactions: list[dict]
    proof: int
    previous_hash: str




# Normal client
@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/login")
async def login(cred: UserLoginCred, response: Response):
    # Get the database connection
    conn = await open_connection()
    try:
        # Query to get user from the database
        query = "SELECT id,password FROM users WHERE email = $1"
        result = await conn.fetchrow(query, cred.email)
        print(result)
        if result:
            # Compare the stored hashed password with the input password
            stored_password_hash = result['password']
            user_id = result['id']
            if bcrypt.checkpw(cred.password.encode('utf-8'), stored_password_hash.encode('utf-8')):
                # Generate JWT token for the user
                token, valid_to = create_jwt_token(cred.email, SECRET_KEY=SECRET_KEY, ALGORITHM=ALGORITHM)
                
                # Set the token as an HttpOnly cookie in the response
                response.set_cookie(
                    key="authToken",
                    value=token,
                    httponly=True,
                    secure=True,  
                    samesite="Strict",  
                    max_age=3600,  
                    expires=valid_to  
                )

                # Log the successful login attempt
                await log_login_attempt(conn, cred.email, success=True, token=token)
                
                # Send the user ID and token validity to the frontend
                return {"user_id": user_id, "valid_to": valid_to.isoformat()}

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








# #admin
# @app.post()
# async def Add_data_for_mining():
#     pass

# @app.post()
# async def Provide_environmental_impact():
#     pass

# @app.post()
# async def update_lifecycle():
#     pass


#block chain

@app.post("/nodes/register")
async def register_node(node: NodeRegistration):
    """Register a new node in the blockchain network"""
    try:
        recycle.register_node(node.address)
        return {
            "message": "Node registered successfully",
            "total_nodes": len(recycle.nodes),
            "nodes": list(recycle.nodes)
        }
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
    transaction_index = recycle.add_transaction(
        sender=transaction.sender,
        recipient=transaction.recipient,
        ewaste_items=transaction.ewaste_items,
        transaction_type=transaction.transaction_type,
        status=transaction.status,
    )
    return {"message": f"Transaction will be added to block {transaction_index}"}

@app.get("/mine")
async def mine_block(miner_address: str):
    """Mine a new block"""
    try:
        block = await recycle.mine_block(miner_address)
        return {
            "message": "New block mined",
            "block_index": block["index"],
            "transactions": block["transactions"],
            "proof": block["proof"],
            "previous_hash": block["previous_hash"],
            "timestamp": datetime.fromtimestamp(block["timestamp"]).isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/chain")
async def get_full_chain():
    """Get the full blockchain"""
    return {
        "chain": recycle.chain,
        "length": len(recycle.chain)
    }

@app.get("/chain/validate")
async def validate_chain():
    """Validate the entire blockchain"""
    is_valid = recycle.valid_chain(recycle.chain)
    return {
        "is_valid": is_valid,
        "chain_length": len(recycle.chain)
    }

@app.post("/nodes/resolve")
async def consensus():
    """Resolve conflicts between nodes using consensus algorithm"""
    replaced = await recycle.resolve_conflicts()
    return {
        "message": "Chain was replaced" if replaced else "Current chain is authoritative",
        "chain": recycle.chain
    }

@app.get("/ewaste/{item_id}/history")
async def get_item_history(item_id: str):
    """Get the complete history of an e-waste item"""
    history = recycle.get_ewaste_history(item_id)
    if not history:
        raise HTTPException(status_code=404, detail="E-waste item not found")
    return {
        "item_id": item_id,
        "history": history,
        "total_transactions": len(history)
    }

@app.get("/rewards/calculate")
async def calculate_rewards(items: list[EWasteItemCreate]):
    """Calculate recycling rewards for e-waste items"""
    ewaste_items = [
        EWasteItem(
            item_id=item.item_id,
            type=item.type,
            weight=item.weight,
            components=item.components,
            manufacturer=item.manufacturer,
            year=item.year
        ) for item in items
    ]
    rewards = recycle.calculate_rewards(ewaste_items)
    return {
        "total_rewards": rewards,
        "items_processed": len(items),
        "calculation_time": datetime.now().isoformat()
    }