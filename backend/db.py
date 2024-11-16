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
            database="UserLog",
            host=os.getenv("POSTGRES_HOST", "localhost"),
            port=os.getenv("POSTGRES_PORT", "5432"),
        )

        # Default database name
        dataname = os.getenv("POSTGRES_DB", "UserLog")

        # Check if the database already exists
        exists = await conn.fetchval(
            "SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1;",
            dataname,
        )

        if not exists:
            print(f"Database '{dataname}' does not exist. Creating it now...")
            
            # Collect user input for new database and user credentials
            user = input("Enter username for new database user: ").strip()
            while not re.match(r"^[a-zA-Z0-9_]+$", user):
                print("Invalid username. Use only letters, numbers, and underscores.")
                user = input("Enter username for new database user: ").strip()

            password = input("Enter password for the user: ").strip()
            if not password:
                raise ValueError("Password cannot be empty.")

            db_name = input("Enter a name for the new database: ").strip()
            while not re.match(r"^[a-zA-Z0-9_]+$", db_name) or len(db_name) < 3:
                print("Invalid database name. Use only letters, numbers, and underscores, with at least 3 characters.")
                db_name = input("Enter a name for the new database: ").strip()

            # Create the new user, database, and grant privileges
            await conn.execute(f'CREATE DATABASE "{db_name}";')
            await conn.execute(f"CREATE USER {user} WITH PASSWORD $1;", password)
            await conn.execute(f"GRANT ALL PRIVILEGES ON DATABASE \"{db_name}\" TO {user};")
            
            print(f"Database '{db_name}' and user '{user}' created successfully.")

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
