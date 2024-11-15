# this is models to be used in the server
from pydantic import BaseModel


#signup 
class UserSignUpCred(BaseModel):
    name: str
    username: str
    password: str
    email: str
    DOB: str

#login
class UserLoginCred(BaseModel):
    username: str
    password: str

#profile
class UserProfile(BaseModel):
    name: str
    username: str
    DOB: str
    # Picture

class UserLog(BaseModel):
    username: str
    token: str
    created_at: str
    valid_to: str