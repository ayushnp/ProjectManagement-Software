from typing import List

from fastapi import APIRouter, status, Depends, HTTPException

from sqlmodel import Session, select

from app.api.dependencies import get_current_active_user
from app.crud import crud_task, crud_project
from app.db.database import get_session
from app.models.project_models import Project
from app.models.user_models import User, ProjectMemberLink
from app.schemas.task_schemas import TaskRead, TaskCreate, TaskUpdate

router = APIRouter()

@router.post("/", response_model=TaskRead,status_code=status.HTTP_201_CREATED)
def create_task_for_project(*,db:Session = Depends(get_session),project_id: int,task_in:TaskCreate,current_user:User=Depends(get_current_active_user)):
    project = crud_project.get_project_by_id(db=db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if current_user not in project.members:
        raise HTTPException(status_code=403, detail="Not authorized to create tasks in this project")

    if task_in.assignee_id:
        assignee = db.get(User, task_in.assignee_id)
        # Check for existence and membership in one simple line
        if not assignee or assignee not in project.members:
            raise HTTPException(
                status_code=400, detail="Assignee is not a member of this project"
            )

    task = crud_task.create_task(db=db, task_in=task_in, project_id=project_id)
    return task


@router.get("/", response_model=List[TaskRead])
def get_project_tasks(*,db: Session = Depends(get_session),project_id: int,current_user: User = Depends(get_current_active_user)):
    project = crud_project.get_project_by_id(db=db, project_id=project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if current_user not in project.members:
        raise HTTPException(
            status_code=403, detail="Not authorized to view tasks in this project"
        )
    tasks = crud_task.get_tasks_by_project(db=db, project_id=project_id)
    return tasks

@router.put("/{task_id}", response_model=TaskRead)
def update_task(*,db: Session = Depends(get_session),project_id: int,task_id: int,task_in: TaskUpdate,current_user: User = Depends(get_current_active_user),):
        project = crud_project.get_project_by_id(db=db, project_id=project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        if current_user not in project.members:
            raise HTTPException(status_code=403, detail="Not authorized to update tasks in this project")

        task = crud_task.get_task(db=db, task_id=task_id)
        if not task or task.project_id != project_id:
            raise HTTPException(status_code=404, detail="Task not found in this project")

        if task_in.assignee_id is not None:
            new_assignee = db.get(User, task_in.assignee_id)
            if not new_assignee or new_assignee not in project.members:
                raise HTTPException(
                    status_code=400, detail="New assignee is not a member of this project"
                )

        task = crud_task.update_task(db=db, db_task=task, task_in=task_in)
        return task