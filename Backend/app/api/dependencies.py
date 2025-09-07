from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session

from app.core.config import settings
from app.db.database import get_session
from app.models.user_models import User
from app.schemas.token_schemas import TokenData
from app.crud import crud_user

# This tells FastAPI that the URL to get the token is "/api/auth/login"
# It expects the token to be sent in the "Authorization" header as "Bearer <token>"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_current_user(
        db: Session = Depends(get_session), token: str = Depends(oauth2_scheme)
) -> User:
    """
    Dependency to get the current user from a JWT token.

    This function is a security dependency. It performs the following steps:
    1. Extracts the JWT token from the request's Authorization header.
    2. Decodes the token using the application's secret key.
    3. Validates the token's payload to extract the user's email.
    4. Fetches the user from the database using the email.
    5. Returns the user object if valid, otherwise raises an HTTP 401 exception.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception

    user = crud_user.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Dependency to check if the current user is active.

    This builds on top of `get_current_user`. After verifying the token and
    fetching the user, it adds an additional check to ensure the user's
    `is_active` flag is true. This is useful for deactivating or banning users
    without permanently deleting their data.
    """
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
