import asyncpg
import os
import re

async def open_connection():
    """Establish and return a connection to the database."""
    try:
        # Connect to the default PostgreSQL database
        conn = await asyncpg.connect(
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASS"),
            database="postgres",
            host=os.getenv("POSTGRES_HOST", "localhost"),
            port=os.getenv("POSTGRES_PORT", "5432"),
        )

        # Check if the database already exists
        dataname = "UserLog"  # Default database name
        exists = await conn.fetchval(
            "SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1;",
            dataname
        )
        
        if not exists:
            print(f"Database '{dataname}' does not exist. Creating it now...")
            
            # Collect user input for new database and user credentials
            user = input("Enter username for new database user: ").strip()
            password = input("Enter password for the user: ").strip()
            
            # Validate the database name
            while True:
                db_name = input("Enter a name for the new database: ").strip()
                if len(db_name) > 2 and re.match(r"^[a-zA-Z0-9_]+$", db_name):
                    break
                print("Invalid database name. Use only letters, numbers, and underscores.")

            # Create the new user, database, and grant privileges
            await conn.execute(f'CREATE DATABASE "{db_name}";')
            await conn.execute(f"CREATE USER {user} WITH PASSWORD $1;", password)
            await conn.execute(f"GRANT ALL PRIVILEGES ON DATABASE \"{db_name}\" TO {user};")
            
            print(f"Database '{db_name}' and user '{user}' created successfully.")

            # Update environment variables (optional, depending on deployment needs)
            os.environ["POSTGRES_USER"] = f"{os.getenv('POSTGRES_USER')},{user}"
            os.environ["POSTGRES_PASS"] = f"{os.getenv('POSTGRES_PASS')},{password}"
            os.environ["POSTGRES_NAME"] = f"{os.getenv('POSTGRES_NAME')},{db_name}"

            # Close initial connection and reconnect to the new database
            await conn.close()
            conn = await asyncpg.connect(
                user=user,
                password=password,
                database=db_name,
                host=os.getenv("POSTGRES_HOST", "localhost"),
                port=os.getenv("POSTGRES_PORT", "5432"),
            )
        else:
            print(f"Database '{dataname}' already exists. Connecting...")
            conn = await asyncpg.connect(
                user=os.getenv("POSTGRES_USER"),
                password=os.getenv("POSTGRES_PASS"),
                database=dataname,
                host=os.getenv("POSTGRES_HOST", "localhost"),
                port=os.getenv("POSTGRES_PORT", "5432"),
            )

        # Confirm connection by fetching PostgreSQL version
        version = await conn.fetchval("SELECT version();")
        print(f"Connected to the database. PostgreSQL Version: {version}")
        return conn

    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None


async def close_connection(conn):
    """Close the database connection."""
    if conn:
        await conn.close()
        print("Database connection closed.")
