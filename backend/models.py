# this is models to be used in the server
from pydantic import BaseModel
from uuid import uuid4
from typing import Optional



#signup 
class UserSignUpCred(BaseModel):
    name: str
    email: str
    password: str
    DOB: str

#login
class UserLoginCred(BaseModel):
    email: str
    password: str

#profile
class UserProfile(BaseModel):
    id: Optional[str] = str(uuid4())
    name: str
    email: str
    DOB: str
    # Picture

class UserLog(BaseModel):
    email: str
    token: str
    created_at: str
    valid_to: str