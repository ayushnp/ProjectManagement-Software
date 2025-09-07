

from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlmodel import SQLModel, Field, Relationship
from .user_models import ProjectMemberLink

class TaskStatus(str, Enum):
    TO_DO = "To-Do"
    IN_PROGRESS = "In Progress"
    DONE = "Done"

class Project(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    owner_id: int = Field(foreign_key="user.id")

    # Use quotes for "User" and the link model name
    members: List["User"] = Relationship(back_populates="projects", link_model=ProjectMemberLink)
    tasks: List["Task"] = Relationship(back_populates="project")
    comments: List["Comment"] = Relationship(back_populates="project")

class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: str | None = None
    status: TaskStatus = Field(default=TaskStatus.TO_DO)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    due_date: datetime | None = None

    project_id: int = Field(foreign_key="project.id")
    assignee_id: int | None = Field(default=None, foreign_key="user.id")

    project: "Project" = Relationship(back_populates="tasks")
    assignee: Optional["User"] = Relationship(back_populates="assigned_tasks")

class Comment(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    project_id: int = Field(foreign_key="project.id")
    author_id: int = Field(foreign_key="user.id")

    project: "Project" = Relationship(back_populates="comments")
    author: "User" = Relationship(back_populates="comments")

