from datetime import datetime
from sqlmodel import SQLModel
from app.models.project_models import TaskStatus


class Taskbase(SQLModel):
    title: str
    description: str|None
    due_date: datetime|None

class TaskCreate(Taskbase):
    assignee_id: int|None

class TaskUpdate(SQLModel):
    title: str
    description: str|None
    due_date: datetime|None
    status: TaskStatus|None
    assignee_id: int|None

class TaskRead(Taskbase):
    id: int
    status: TaskStatus
    project_id: int
    assignee_id: int|None
