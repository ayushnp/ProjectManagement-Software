from sqlmodel import SQLModel, select, Session

from app.core.security import get_password_hash
from app.models.user_models import User
from app.schemas.user_schemas import UserCreate


def get_user_by_email(db:Session,*,email:str) -> User|None:
    return db.exec(select(User).where(User.email == email)).first()

def create_user(db:Session,*,user_in: UserCreate ) -> User:
    hashed_password = get_password_hash(user_in.password)
    db_user = User(
        full_name=user_in.full_name,
        email=user_in.email,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user