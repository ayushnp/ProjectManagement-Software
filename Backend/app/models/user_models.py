from sqlmodel import SQLModel,Field


class ProjectMemberLink(SQLModel,table=True):
    user_id:int|None=Field(default=None,foreign_key="user.id",index=True,primary_key=True)
    project_id:int|None=Field(default=None,foreign_key="project.id",index=True,primary_key=True)


class User(SQLModel,table=True):
    id:int|None=Field(default=None,index=True,primary_key=True)
    full_name:str
    email:str=Field(unique=True,index=True)
    hashed_password:str
    is_active:bool=Field(default=True)


