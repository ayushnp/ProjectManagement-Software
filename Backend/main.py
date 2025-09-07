from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.api_router import api_router
from app.db.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
app=FastAPI(title="SynergySphere API",
    description="The backend API for the SynergySphere collaboration platform.",
    version="0.1.0",lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    # Add other allowed origins here (e.g., your frontend URL)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # or ["*"] to allow all origins (less secure)
    allow_credentials=True,
    allow_methods=["*"],           # allow all HTTP methods
    allow_headers=["*"],           # allow all headers
)



app.include_router(api_router, prefix="/api")

@app.get('/',tags=["Root"])
def read_root():
    return {"message": "Welcome to SynergySphere API! Navigate to /docs for documentation."}


