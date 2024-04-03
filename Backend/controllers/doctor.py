# Import necessary modules and libraries
import os
from typing import Annotated

import aiofiles
from crud.doctor import get_doctor_by_id, get_doctor_list
from litestar import Controller, MediaType, get, patch, post
from litestar.datastructures import UploadFile
from litestar.dto import DTOData
from litestar.enums import RequestEncodingType
from litestar.params import Body
from models.doctor import Doctor
from schemas.doctor import CreateDoctorDTO, DoctorDTO, DoctorSchema
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7


class DoctorController(Controller):
    path = "/doctor"
    return_dto = DoctorDTO

    @get("/", exclude_from_auth=True)
    async def get_doctors(
        self, session: AsyncSession, limit: int = 100, offset: int = 0
    ) -> list[DoctorSchema]:
        user = await get_doctor_list(session, limit, offset)
        return user

    @post("/", dto=CreateDoctorDTO)
    async def create_doctor(
        self, session: AsyncSession, data: DTOData[DoctorSchema]
    ) -> DoctorSchema:
        doctor_data = data.create_instance(id=uuid7())
        validated_doctor_data = DoctorSchema.model_validate(doctor_data)
        doctor = Doctor(**validated_doctor_data.__dict__)
        session.add(doctor)

        await session.commit()
        return validated_doctor_data

    @patch("/{doctor_id:str}/image", media_type=MediaType.TEXT)
    async def update_doctor_picture(
        self,
        doctor_id: str,
        session: AsyncSession,
        data: Annotated[UploadFile, Body(media_type=RequestEncodingType.MULTI_PART)],
    ) -> str:
        doctor = await get_doctor_by_id(session, doctor_id)
        content = await data.read()
        filename = f"{doctor.id}.jpg"

        image_dir = "static/images/doctors"
        os.makedirs(image_dir, exist_ok=True)

        file_path = os.path.join(image_dir, filename)
        async with aiofiles.open(file_path, "wb") as outfile:
            await outfile.write(content)

        return f"Doctor picture added at: {file_path}"
