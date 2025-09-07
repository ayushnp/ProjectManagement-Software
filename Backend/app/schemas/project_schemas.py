from sqlmodel import SQLModel
from typing import List, Optional
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


class ProjectUpdate(SQLModel):
    """Schema for updating a project's details."""
    name: Optional[str] = None
    description: Optional[str] = None