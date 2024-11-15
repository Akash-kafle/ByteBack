# this is models to be used in the server
from pydantic import BaseModel


#signup 
class UserSignUpCred(BaseModel):
    # id: str
    name: str
    # username: str
    email: str
    password: str
    DOB: str

#login
class UserLoginCred(BaseModel):
    username: str
    password: str

#profile
class UserProfile(BaseModel):
    id: str
    name: str
    username: str
    DOB: str
    # Picture

class UserLog(BaseModel):
    username: str
    token: str
    created_at: str
    valid_to: str