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
from sqlalchemy import select
from lib.redis import redis
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7
import aiofiles

from schemas.medicine import MedicineDTO, MedicineSchema, CreateMedicineDTO
from models.user import User
from crud.user import get_user_by_id, get_user_by_username, get_user_list
from controllers.auth import oauth2_auth

from crud.medicine import get_medicine_list
from models.doctor import Doctor

from crud.day import get_days_list
from schemas.doctor import DoctorDTO, DoctorSchema, CreateDoctorDTO
from schemas.day import DayDTO, DaySchema, CreateDayDTO
from models.day import Day


class DayController(Controller):
    path = '/day'
    return_dto = DayDTO

    @get('/', exclude_from_auth=True)
    async def get_days(self, session: AsyncSession) -> list[DaySchema]:
        days = await get_days_list(session)
        return days
    

    @post('/', dto=CreateDayDTO)
    async def create_day(self, session:AsyncSession, data: DTOData[DaySchema]) -> DaySchema:

        day_data = data.create_instance(id=uuid7())
        validated_day_data = DaySchema.model_validate(day_data)
        day = Day(**validated_day_data.__dict__)
        session.add(day)
        

        await session.commit()
        return validated_day_data
    

    
    @get('/{day_name:str}', exclude_from_auth=True)
    async def get_day_by_name(self, session: AsyncSession, day_name: str) -> DaySchema:
        query = select(Day).where(Day.day == day_name)
        result = await session.execute(query)
        day = result.scalar_one_or_none()
        if day is None:
            raise HTTPException(404, "Day not found")
        return day



    @post('/initialize', dto=CreateDayDTO)
    async def initialize_days(self, session:AsyncSession) -> str:
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        for day in days:
            session.add(Day(id=uuid7(), day=day))
        

        await session.commit()
        return "Initialized days"
    

    