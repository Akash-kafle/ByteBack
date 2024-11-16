from typing import Optional
from fastapi import HTTPException, Request , Header
from .db import open_connection, close_connection
from datetime import datetime, timedelta, timezone
import jwt
import hashlib
import json
from asyncpg import Connection


# Function to log login attempts
async def log_login_attempt(conn, username: str, success: bool, token ,error_message: Optional[str] = None):
    """Log the login attempt to the 'login_logs' table."""
    try:
        await conn.execute("DROP TABLE login_logs;")
        # Ensure that the login_logs table exists
        await conn.execute(
            """
            CREATE TABLE IF NOT EXISTS login_logs (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                success BOOLEAN NOT NULL,
                error_message TEXT,
                timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                token TEXT
            );
            """
        )
        
        # Insert the login attempt into the login_logs table
        await conn.execute(
            """
            INSERT INTO login_logs (email, success, error_message, token)
            VALUES ($1, $2, $3, $4);
            """,
            username, success, error_message, token
        )
        print(f"Login attempt for user '{username}' logged successfully.")
    except Exception as e:
        print(f"Failed to log login attempt for '{username}': {e}")

async def verify_jwt_token(authorization: str) -> int:
    # Check if the Authorization header exists
    if not authorization:
        raise HTTPException(
            status_code=401, detail="Authorization header is required"
        )
    
    # Ensure the Authorization header starts with "Bearer "
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Invalid authorization header format. Expected 'Bearer <token>'"
        )
    
    # Extract the token from the header
    token = authorization[len("Bearer "):]
    
    # Connect to the database and check the token
    conn: Connection = await open_connection()
    try:
        query = "SELECT id FROM login_logs WHERE token = $1"
        result = await conn.fetchrow(query, token)
        
        if result:
            return result["id"]
        else:
            raise HTTPException(
                status_code=401, detail="Invalid or expired token"
            )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error verifying token: {str(e)}"
        )
    finally:
        await close_connection(conn)


# Helper function to generate JWT token
def create_jwt_token(email: str, SECRET_KEY, ALGORITHM):
     # Use UTC timezone explicitly
    now = datetime.now(timezone.utc)
    exp = now + timedelta(hours=1)  # Token expiry time is 1 hour from now
    
    payload = {
        "email": email,
        "exp": exp,  # Must be a UTC datetime
        "iat": now,  # Must also be UTC
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token, exp

# def create_wallet(email: str)-> WalletAccount:
#     wallet = WalletAccount(
#         address= hashlib.sha256(json.dumps(vars(email), sort_keys=True).encode()).hexdigest(),
#         balance=0,
#         transaction_history=[],
#         rewards_earned=0,
#         total_ewaste_processed=0
#     )
#     return wallet