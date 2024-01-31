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
from models.company import Company
from crud.company import get_company_list, get_company_by_name
from controllers.auth import oauth2_auth

from schemas.company import CompanyDTO, CompanySchema, CreateCompanyDTO

class CompanyController(Controller):
    path = '/company'
    return_dto = CompanyDTO

    
    @get('/', exclude_from_auth=True)
    async def get_companies(self, session: AsyncSession, limit: int = 100, offset: int = 0) -> list[CompanySchema]:
        user = await get_company_list(session, limit, offset)
        return user


    @post('/', dto=CreateCompanyDTO)
    async def create_company(self, session:AsyncSession, data: DTOData[CompanySchema]) -> CompanySchema:
        company_data = data.create_instance(id=uuid7(), logo=None, address_street=None, address_zip=None, address_city=None,address_province=None, address_country=None)

        validated_company_data = CompanySchema.model_validate(company_data)
        print(validated_company_data)

        session.add(Company(**validated_company_data.__dict__))

        await session.commit()
        return validated_company_data
    

    @post('/{name:str}')
    async def get_company(self, session:AsyncSession, name: str) -> CompanySchema:
        company = await get_company_by_name(session, name)
        return CompanySchema.model_validate(company)

