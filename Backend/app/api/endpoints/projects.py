from typing import List

from fastapi import APIRouter,Depends,status,HTTPException
from sqlmodel import Session, select

from app.api.dependencies import get_current_active_user
from app.crud import crud_project
from app.db.database import get_session
from app.models.project_models import Project
from app.models.user_models import User, ProjectMemberLink
from app.schemas.project_schemas import ProjectRead, ProjectCreate, ProjectDetail, ProjectUpdate
from app.schemas.user_schemas import UserPublic

router = APIRouter()

@router.post("/",response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
async def create_project(*,project_in: ProjectCreate,db:Session=Depends(get_session),current_user:User=Depends(get_current_active_user)):
        project=crud_project.create_project_with_owner(db=db,project_in=project_in,owner_id=current_user.id)
        return project


@router.get("/",response_model=List[ProjectRead])
async def get_projects(*,db:Session=Depends(get_session),current_user:User=Depends(get_current_active_user)):

    return current_user.projects


@router.get("/{project_id}",response_model=ProjectDetail)
def get_project_details(*,db:Session=Depends(get_session),project_id=int,current_user:User=Depends(get_current_active_user)):
    project=crud_project.get_project_by_id(db=db,project_id=project_id)
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")

    if current_user not in project.members:
        raise HTTPException(
            status_code=403, detail="Not authorized to access this project"
        )

    return project



@router.put("/{project_id}", response_model=ProjectRead)
def update_project(*,db: Session = Depends(get_session),project_id: int,project_in: ProjectUpdate,current_user: User = Depends(get_current_active_user),):
    project = crud_project.get_project_by_id(db=db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Only the project owner can update it"
        )

    project = crud_project.update_project(
        db=db, db_project=project, project_in=project_in
    )
    return project

@router.post("/{project_id}/members",response_model=UserPublic,status_code=status.HTTP_201_CREATED)
def add_project_member(*,db: Session = Depends(get_session),project_id: int,user_id: int,current_user: User = Depends(get_current_active_user),):
    project = crud_project.get_project_by_id(db=db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Only the project owner can add members"
        )

    user_to_add = db.get(User, user_id)
    if not user_to_add:
        raise HTTPException(status_code=404, detail="User to add not found")

    if user_to_add in project.members:
        raise HTTPException(
            status_code=409, detail="User is already a member of this project"
        )

    crud_project.add_member_to_project(db=db, project=project, user=user_to_add)
    return user_to_add