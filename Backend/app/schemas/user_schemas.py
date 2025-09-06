from sqlmodel import SQLModel


class UserBase(SQLModel):
    email: str
    full_name: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

class UserPublic(UserBase):
    id: int
    full_name: str

