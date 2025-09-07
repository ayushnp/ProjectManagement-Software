from fastapi import APIRouter

from app.api.endpoints import auth, users, projects, tasks

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

api_router.include_router(users.router, prefix="/users", tags=["Users"])


api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])


api_router.include_router(tasks.router, prefix="/projects/{project_id}/tasks", tags=["Tasks"])