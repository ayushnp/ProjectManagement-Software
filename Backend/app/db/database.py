
from sqlmodel import create_engine, SQLModel, Session
from app.core.config import settings
from app.models.user_models import User, ProjectMemberLink
from app.models.project_models import Project, Task, Comment

engine=create_engine(settings.DATABASE_URL,echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session