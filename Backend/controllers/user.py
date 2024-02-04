# Import necessary modules and libraries
from typing import Any, Annotated
import os
import datetime
import pytz
from uuid import UUID
from litestar import Response, Request, get, post, put, patch, MediaType
from litestar import Controller
from litestar.dto import DTOData
from litestar.exceptions import HTTPException
from litestar.contrib.jwt import OAuth2Login, Token
from litestar.datastructures import UploadFile
from litestar.enums import RequestEncodingType
from litestar.params import Body
from lib.redis import redis
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7
import aiofiles

from schemas.user import UserDTO, UserOutDTO, CreateUserDTO,UserSchema
from models.user import User
from crud.user import get_user_by_id, get_user_by_username, get_user_list
from controllers.auth import oauth2_auth



class UserController(Controller):
    path = '/user'
    return_dto = UserOutDTO

    # @patch('/', dto=UpdateUserDTO)
    # async def update_user(self, session: AsyncSession, request: 'Request[User, Token, Any]', data: DTOData[UserSchema]) -> str:
    #     user = await get_user_by_id(session, request.user)
    #     data.update_instance(user)
    #     return "user updated"
        

    @get('/', exclude_from_auth=True)
    async def get_users(self, request: 'Request[User, Token, Any]', session: AsyncSession, limit: int = 100, offset: int = 0) -> list[UserSchema]:
    # async def get_users(self, request: 'Request[User, Token, Any]', session: AsyncSession, limit: int = 100, offset: int = 0) -> str:

        '''
        Get a list of users.

        Args:
            request (Request): The HTTP request object.
            session (AsyncSession): The database session.
            limit (int): The maximum number of users to retrieve.
            offset (int): The offset for paginating through users.

        Returns:
            list[UserSchema]: A list of user objects in UserSchema format.
        '''
        user = await get_user_list(session, limit, offset)
        return user


    @get('/me')
    async def get_me(self, request: 'Request[User, Token, Any]', session: AsyncSession) -> UserSchema:
        '''
        Get the user's own information.

        Args:
            request (Request): The HTTP request object.
            session (AsyncSession): The database session.

        Returns:
            UserSchema: The user's information in UserSchema format.
        '''
        return UserSchema.model_validate(await get_user_by_id(session, request.user))


    @post('/', dto=CreateUserDTO, exclude_from_auth=True)
    async def create_user_login(self, session: AsyncSession, data: DTOData[UserSchema]) -> Response[OAuth2Login]:
    # async def create_user_login(self, session: AsyncSession, data: DTOData[UserSchema]) -> str:

        '''
        Create a new user and logs in. This might become the new default way of creating users.

        Args:
            session (AsyncSession): The database session.
            data (DTOData[UserSchema]): Data for creating the new user.

        Returns:
            UserSchema: The created user's information in UserSchema format.
        
        Raises:
            HTTPException: If a user with the same username already exists.
        '''
        current_time = datetime.datetime.now(pytz.utc)
        user_data = data.create_instance(id=uuid7(), created_at=current_time, updated_at=current_time)
        validated_user_data = UserSchema.model_validate(user_data)
        validated_user_data.set_password(validated_user_data.password)
        # a = User(**validated_user_data.__dict__)
        # b = User(username="Wilbur", first_name="we", last_name="Elbouni", email="email", password="wew", profile_picture=None)
        # print(validated_user_data)
        try:
            session.add(User(**validated_user_data.__dict__))
            token = oauth2_auth.login(identifier=str(validated_user_data.id))
            session_key = f'session:{validated_user_data.id}'
            await redis.hmset(session_key, {'user_id': str(validated_user_data.id), 'username': validated_user_data.username, 'token': str(token.cookies)})
            return token
        except Exception as e:
            raise HTTPException(status_code=409, detail=f'error: {e}')
        
    
    @post('/medicine/{medicine_name: str}')
    async def add_medicine(self, request: 'Request[User, Token, Any]', session: AsyncSession, medicine_name: str) -> str:
        user = get_user_by_id(request.user)
        return "CHILL"

    # Define a GET route for testing, excluding it from authentication Delete later on!
    @get('/test', exclude_from_auth=True)
    async def test(self) -> str:
        '''
        Test route for Redis functionality.

        Returns:
            str: A test message from Redis.
        '''
        await redis.set('foo', 'bar')
        return await redis.get('foo')
