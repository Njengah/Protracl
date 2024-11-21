# db-con-test.py

from sqlalchemy.orm import Session
from db import User, SessionLocal


# Function to test the connection
def test_connection():
    try:
        # Create a new session
        db = SessionLocal()

        # Try to fetch a user (this will check the connection and query execution)
        user = db.query(User).first()  # Adjust this if necessary

        if user:
            print(f"User found: {user.email}")
        else:
            print("No users found in the database.")

        db.close()  # Close the session after the query
    except Exception as e:
        print(f"Error: {e}")


# Test the connection
if __name__ == "__main__":
    test_connection()
