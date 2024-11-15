import asyncpg
import os
from asyncpg import Connection
import re

async def open_connection():
    """Establish and return a connection to the database."""
    try:
        # Connect to the PostgreSQL server
        conn = await asyncpg.connect(
            user=os.environ.get("POSTGRES_USER"),
            password=os.environ.get("POSTGRES_PASS"),
            database="postgres",  # Connect to 'postgres' or default database first
            host='127.0.0.1', 
            port='5432'
        )

        # Check if the 'UserLog' database exists
        exists = await conn.fetchval("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'UserLog';")

        
        if not exists:
            # Create the 'UserLog' database
            user = input("Enter user: ")
            password = input("Enter password: ")
            dataname = input("Enter database name: ")


            while True:
                dataname = input("Enter database name: ")
                # Validate and clean the input
                if dataname.length > 2 and re.match(r"^[a-zA-Z0-9_]+$", dataname):
                    # The name contains only valid characters (alphanumeric and underscores)
                    await conn.execute(f'CREATE DATABASE "{dataname}";')
                    break
                else:
                    print("Invalid database name. Use only letters, numbers, and underscores.")

            await conn.execute(
                "CREATE USER {} WITH PASSWORD $1".format(user), password
            )
            print(f"User '{user}' created.")
            
            # Grant the new user privileges on the 'UserLog' database
            await conn.execute(
                "GRANT ALL PRIVILEGES ON DATABASE \"UserLog\" TO {};".format(user)
            )
            print(f"Granted privileges on 'UserLog' to user '{user}'.")

            # Close the connection to 'postgres' and reconnect to the new 'UserLog' database
            await conn.close()

            # Reconnect with the newly created user
            conn = await asyncpg.connect(
                user=user,
                password=password,
                database=dataname,
                host='127.0.0.1',
                port='5432'
            )
            
            # Append values to existing environment variables or create them if they don't exist
            os.environ["POSTGRES_USER"] = f"{os.getenv('POSTGRES_USER', '')},{user}"
            os.environ["POSTGRES_PASS"] = f"{os.getenv('POSTGRES_PASS', '')},{password}"
            os.environ["POSTGRES_NAME"] = f"{os.getenv('POSTGRES_NAME', '')},{dataname}"

            # Get version to confirm connection
            version = await conn.fetchval("SELECT version();")
            print(f"Connected to the database. Version: {version}")
            return conn
        
        else:
            print("Database 'UserLog' already exists.")
            # If the database exists, just connect to it
            conn = await asyncpg.connect(
                user=os.environ.get("POSTGRES_USER"),
                password=os.environ.get("POSTGRES_PASS"),
                database="UserLog",
                host='127.0.0.1',
                port='5432'
            )

            # Get version to confirm connection
            version = await conn.fetchval("SELECT version();")
            print(f"Connection established to: {version}")
            return conn

    except Exception as e:
        print(f"Error: {e}")
        return None

async def close_connection(conn: Connection):
    """Close the database connection."""
    if conn:
        await conn.close()
        print("Connection closed.")
