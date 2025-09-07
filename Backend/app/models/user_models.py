from typing import List

from sqlmodel import SQLModel, Field, Relationship

class ProjectMemberLink(SQLModel, table=True):
    user_id: int | None = Field(default=None, foreign_key="user.id", primary_key=True)
    project_id: int | None = Field(default=None, foreign_key="project.id", primary_key=True)

class User(SQLModel,table=True):
    id:int|None=Field(default=None,index=True,primary_key=True)
    full_name:str
    email:str=Field(unique=True,index=True)
    hashed_password:str
    is_active:bool=Field(default=True)

    projects: List["Project"] = Relationship(back_populates="members", link_model=ProjectMemberLink)
    assigned_tasks: List["Task"] = Relationship(back_populates="assignee")
    comments: List["Comment"] = Relationship(back_populates="author")


