from sqlmodel import Session, select

from app.models.project_models import Task
from app.schemas.task_schemas import TaskCreate, TaskUpdate


def get_task(db: Session, task_id:int) -> Task | None:
    return db.get(Task, task_id)

def get_tasks_by_project(db: Session,*, project_id:int) -> list[Task]:
    statement=select(Task).where(Task.project_id == project_id)
    return db.exec(statement).all()

def create_task(db: Session,*, task_in:TaskCreate,project_id:int) -> Task:
    db_task = Task.model_validate(task_in,update={"project_id":project_id})
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, *, db_task: Task, task_in: TaskUpdate) -> Task:
    task_data=task_in.model_dump(exclude_unset=True)
    for key,value in task_data.items():
        setattr(db_task, key, value)

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, *, task_id: Task) -> Task|None:
    db_task = db.get(Task, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task
