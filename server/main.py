from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
from starlette.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from the frontend (Next.js on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only the Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"


# Pydantic model for login request
class LoginRequest(BaseModel):
    email: str
    password: str


# Mock database of users
fake_users_db = {
    "test@example.com": {"password": "testpassword", "full_name": "Test User"}
}


# Login endpoint
@app.post("/login")
def login(request: LoginRequest):
    # Check if user exists in the mock database
    user = fake_users_db.get(request.email)
    if user and user["password"] == request.password:
        # Create JWT token on successful login
        expiration = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode(
            {"sub": request.email, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM
        )
        return {"success": True, "token": token}

    # If credentials are invalid, raise an HTTPException
    raise HTTPException(status_code=401, detail="Invalid credentials")
