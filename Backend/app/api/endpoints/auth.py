from fastapi import APIRouter, HTTPException,status,Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from app.core import security
from app.core.security import verify_password
from app.crud import crud_user
from app.db.database import get_session
from app.schemas.token_schemas import Token
from app.schemas.user_schemas import UserRead, UserCreate

router=APIRouter()

@router.post("/register", response_model=UserRead,status_code=status.HTTP_201_CREATED)
def register_user(user_in:UserCreate,db:Session=Depends(get_session)):
    db_user=crud_user.get_user_by_email(db,email=user_in.email)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Email already registered")
    return crud_user.create_user(db,user_in=user_in)


@router.post("/login", response_model=Token)
def login_for_access_token(db:Session=Depends(get_session),form_data: OAuth2PasswordRequestForm = Depends()):
    user=crud_user.get_user_by_email(db,email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(subject=user.email)
    return {"access_token": access_token, "token_type": "bearer"}