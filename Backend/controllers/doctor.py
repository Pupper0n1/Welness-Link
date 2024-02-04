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

from schemas.medicine import MedicineDTO, MedicineSchema, CreateMedicineDTO
from models.user import User
from crud.user import get_user_by_id, get_user_by_username, get_user_list
from controllers.auth import oauth2_auth

from crud.medicine import get_medicine_list
from models.doctor import Doctor

from crud.company import get_company_by_id
from crud.doctor import get_doctor_by_id, get_doctor_list
from schemas.doctor import DoctorDTO, DoctorSchema, CreateDoctorDTO


class DoctorController(Controller):
    path = '/doctor'
    return_dto = DoctorDTO

    @get('/', exclude_from_auth=True)
    async def get_doctors(self, session: AsyncSession, limit: int = 100, offset: int = 0) -> list[MedicineSchema]:
        user = await get_medicine_list(session, limit, offset)
        return user
    

    @post('/', dto=CreateDoctorDTO)
    async def create_doctor(self, session:AsyncSession, data: DTOData[DoctorSchema]) -> DoctorSchema:

        doctor_data = data.create_instance(id=uuid7())

        validated_doctor_data = DoctorSchema.model_validate(doctor_data)

        doctor = Doctor(**validated_doctor_data.__dict__)

        session.add(doctor)
        

        await session.commit()
        return validated_doctor_data
    
    
    @patch('/{doctor_id:str}/profile_image', media_type=MediaType.TEXT)
    async def update_doctor_picture(self, doctor_id: str, session: AsyncSession, data: Annotated[UploadFile, Body(media_type=RequestEncodingType.MULTI_PART)]) -> str:
        
        doctor = await get_doctor_by_id(session, doctor_id)


        content = await data.read()
        filename = f'{doctor.id}.jpg'

        image_dir = "static/images/doctors"
        os.makedirs(image_dir, exist_ok=True)

        file_path = os.path.join(image_dir, filename)
        async with aiofiles.open(file_path, 'wb') as outfile:
            await outfile.write(content)

        return f"Doctor picture added at: {file_path}"




 