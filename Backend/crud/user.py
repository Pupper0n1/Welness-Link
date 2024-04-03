from uuid import UUID

from litestar.exceptions import HTTPException
from models.user import User
from sqlalchemy import orm, select
from sqlalchemy.ext.asyncio import AsyncSession

from datetime import datetime, date


async def get_user_list(
    session: AsyncSession, limit: int = 100, offset: int = 0
) -> list[User]:
    """
    Retrieve a list of users with optional pagination.

    Args:
        session (AsyncSession): The database session for executing queries.
        limit (int): Maximum number of users to return.
        offset (int): Number of users to skip before starting to return results.

    Returns:
        list[User]: A list of User objects.
    """
    # Create a query to select users with a limit and offset for pagination and execute it.
    # query = select(User).options(orm.selectinload(User.communities)).limit(limit).offset(offset)
    query = (
        select(User)
        .options(orm.selectinload(User.medicines))
        .limit(limit)
        .offset(offset)
    )

    result = await session.execute(query)
    return result.scalars().all()


async def get_user_by_username(session: AsyncSession, username: str) -> User:
    """
    Retrieve a single user by their username.

    Args:
        session (AsyncSession): The database session for executing queries.
        username (str): The username of the user to retrieve.

    Returns:
        UserSchema: The user object with the specified username.

    Raises:
        HTTPException: If there's an error retrieving the user or if the user doesn't exist.
    """
    # Create a query to find the user by username and execute it.
    # query = select(User).options(orm.selectinload(User.communities)).where(User.username == username)
    query = (
        select(User)
        .options(orm.selectinload(User.medicines))
        .where(User.username == username)
    )

    result = await session.execute(query)
    try:
        return result.scalar_one()
    except:
        # Raise an HTTP exception if there's an issue retrieving the user.
        raise HTTPException(status_code=401, detail="Error retrieving user")


async def get_user_by_id(session: AsyncSession, id: UUID) -> User:
    """
    Retrieve a single user by their username.

    Args:
        session (AsyncSession): The database session for executing queries.
        username (str): The username of the user to retrieve.

    Returns:
        UserSchema: The user object with the specified username.

    Raises:
        HTTPException: If there's an error retrieving the user or if the user doesn't exist.
    """
    # Create a query to find the user by username and execute it.
    # query = select(User).options(orm.selectinload(User.communities)).where(User.id == id)
    query = select(User).options(orm.selectinload(User.medicines)).where(User.id == id)

    result = await session.execute(query)
    try:
        return result.scalar_one()
    except:
        # Raise an HTTP exception if there's an issue retrieving the user.
        raise HTTPException(status_code=401, detail="Error retrieving user")

