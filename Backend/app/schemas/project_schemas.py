from sqlmodel import SQLModel
from typing import List
from app.schemas.user_schemas import UserPublic
from app.schemas.task_schemas import TaskRead


class ProjectBase(SQLModel):
    name:str
    description: str|None

class ProjectCreate(ProjectBase):
    pass

class ProjectRead(ProjectBase):
    id:int
    owner_id:int

class ProjectDetail(ProjectBase):
    members:List[UserPublic]=[]
    tasks:List[TaskRead]=[]



