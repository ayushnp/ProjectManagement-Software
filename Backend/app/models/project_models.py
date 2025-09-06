from datetime import datetime
from enum import Enum
from typing import List
from sqlmodel import SQLModel,Field,Relationship
from .user_models import User,ProjectMemberLink

class TaskStatus(str, Enum):
    TO_DO="To-Do"
    IN_PROGRESS="In Progress"
    DONE="Done"

class Project(SQLModel,table=True):
    id:int|None=Field(default=None,primary_key=True,index=True)
    name:str=Field(default=True)
    description:str|None
    created_at:datetime=Field(default_factory=datetime.now,nullable=False)
    owner_id:int=Field(foreign_key="user.id")

    members: List["User"] = Relationship(back_populates="projects", link_model=ProjectMemberLink)
    tasks: List["Task"] = Relationship(back_populates="project")
    comments: List["Comment"] = Relationship(back_populates="project")


class Task(SQLModel,table=True):
    id:int|None=Field(default=None,primary_key=True,index=True)
    title:str
    description:str|None
    status:TaskStatus=Field(default=TaskStatus.TO_DO)
    created_at:datetime=Field(default_factory=datetime.now,nullable=False)

    project_id:int=Field(foreign_key="project.id")
    assignee_id:int|None=Field(default=None,foreign_key="user.id")


class Comment(SQLModel,table=True):
    id:int|None=Field(default=None,primary_key=True,index=True)
    content:str
    created_at:datetime=Field(default_factory=datetime.now,nullable=False)

    project_id:int=Field(foreign_key="project.id")
    author_id:int=Field(foreign_key="user.id")

    project: "Project" = Relationship(back_populates="comments")
    author: "User" = Relationship(back_populates="comments")

