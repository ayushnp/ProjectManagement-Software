from typing import List

from fastapi import APIRouter, Depends

from sqlmodel import select,Session
from starlette import status

from app.api.dependencies import get_current_active_user
from app.db.database import get_session
from app.models.user_models import User
from app.schemas.user_schemas import UserRead, UserPublic

router=APIRouter()

@router.get("/me", response_model=UserRead)
def read_users_me(current_user:User=Depends(get_current_active_user)):
    return current_user


@router.get("/", response_model=List[UserPublic])
def search_users(*,db:Session=Depends(get_session),email:str="",current_user:User=Depends(get_current_active_user)):
    if not email:
        return []
    statement=select(User).where(User.email.contains(email)).limit(10)
    users=db.exec(statement).all()
    return users




