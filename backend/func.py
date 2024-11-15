from typing import Optional
from fastapi import HTTPException, Request , Header
from datetime import datetime, timedelta
import jwt


# Function to log login attempts
async def log_login_attempt(conn, username: str, success: bool, error_message: Optional[str] = None):
    """Log the login attempt to the 'login_logs' table."""
    try:
        # Ensure that the login_logs table exists
        await conn.execute(
            """
            CREATE TABLE IF NOT EXISTS login_logs (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                success BOOLEAN NOT NULL,
                error_message TEXT,
                timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        
        # Insert the login attempt into the login_logs table
        await conn.execute(
            """
            INSERT INTO login_logs (username, success, error_message)
            VALUES ($1, $2, $3);
            """,
            username, success, error_message
        )
        print(f"Login attempt for user '{username}' logged successfully.")
    except Exception as e:
        print(f"Failed to log login attempt for '{username}': {e}")


# Helper function to verify JWT token and extract user info
def verify_jwt_token(SECRET_KEY: str, ALGORITHM: str):
    def verify(authorization: str = Header(...)):
        try:
            if not authorization.startswith("Bearer "):
                raise HTTPException(status_code=401, detail="Invalid authorization header format")
            
            token = authorization[len("Bearer "):]
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload.get("username")  # Return username or any user-specific claim
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
    return verify

# Helper function to generate JWT token
def create_jwt_token(username: str, SECRET_KEY, ALGORITHM):
    expiration_time = datetime.utcnow() + timedelta(hours=1)  # 1 hour validity
    payload = {
        "sub": username,
        "exp": expiration_time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token, expiration_time
