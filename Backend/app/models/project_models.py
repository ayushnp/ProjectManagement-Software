from datetime import datetime
from enum import Enum
from sqlmodel import SQLModel,Field



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



