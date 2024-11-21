# server/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta

app = FastAPI()

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
    user = fake_users_db.get(request.email)
    if user and user["password"] == request.password:
        expiration = datetime.utcnow() + timedelta(hours=1)
        token = jwt.encode(
            {"sub": request.email, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM
        )
        return {"success": True, "token": token}
    raise HTTPException(status_code=401, detail="Invalid credentials")
