from typing import List

from sqlmodel import select, Session

from app.models.project_models import Project
from app.models.user_models import ProjectMemberLink, User
from app.schemas.project_schemas import ProjectCreate


def get_project(db:Session,project_id:int) -> Project|None:
    return db.get(Project, project_id)


def get_project_by_user(db:Session,user_id:int) -> List[Project]:
    statement = select(Project).join(ProjectMemberLink).where(ProjectMemberLink.user_id == user_id)
    return db.exec(statement).all()


def create_project(db:Session,*,project_in:ProjectCreate,owner_id:int) -> Project:
    db_project = Project.model_validate(project_in, update={"owner_id": owner_id})
    owner=db.get(User,owner_id)
    if not owner:
        raise ValueError("Owner not found")

    db_project.members.append(owner)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def add_member_to_project(db:Session,*,project:Project,user:User) -> Project:
    if user not in project.members:
        project.members.append(user)
        db.add(project)
        db.commit()
        db.refresh(project)
    return project