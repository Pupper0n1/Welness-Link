# Import necessary modules and libraries
import datetime
import os
from typing import Annotated, Any

import aiofiles
from crud.company import get_company_by_id
from crud.day import get_day_by_name
from crud.medicine import get_medicine_by_id, get_medicine_list
from crud.user import get_user_by_id
from litestar import Controller, MediaType, Request, get, patch, post
from litestar.contrib.jwt import Token
from litestar.datastructures import UploadFile
from litestar.dto import DTOData
from litestar.enums import RequestEncodingType
from litestar.params import Body
from models.medicine import Medicine
from models.user import User
from schemas.medicine import CreateMedicineDTO, MedicineDTO, MedicineSchema
from schemas.user_medicine import (
    AddUserMedicineAssociationDTO,
    UserMedicineAssociationSchema,
)
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7
from crud.user_medicine import subtract_dosage


class MedicineController(Controller):
    path = "/medicine"
    return_dto = MedicineDTO

    @get("/", exclude_from_auth=True)
    async def get_medicine(
        self,
        request: "Request[User, Token, Any]",
        session: AsyncSession,
        limit: int = 100,
        offset: int = 0,
    ) -> list[MedicineSchema]:
        user = await get_medicine_list(session, limit, offset)
        return user

    @post("/", dto=CreateMedicineDTO)
    async def create_medicine(
        self, session: AsyncSession, data: DTOData[MedicineSchema]
    ) -> MedicineSchema:
        medicine_data = data.create_instance(id=uuid7())
        validated_medicine_data = MedicineSchema.model_validate(medicine_data)

        input_data = data.as_builtins()

        company = await get_company_by_id(session, input_data["company_id"])
        # print(company)
        medicine = Medicine(**validated_medicine_data.__dict__)

        session.add(medicine)

        # company.medicines.append(medicine)
        company.medicines.append(medicine)

        # await session.commit()
        return validated_medicine_data
        # return "CHILL"

    @patch("/{medicine: str}/image", media_type=MediaType.TEXT)
    async def update_medicine_image(
        self,
        medicine_id: str,
        session: AsyncSession,
        data: Annotated[UploadFile, Body(media_type=RequestEncodingType.MULTI_PART)],
    ) -> str:
        medicine = await get_medicine_by_id(session, medicine_id)
        content = await data.read()
        filename = f"{medicine.id}.jpg"

        image_dir = "static/images/medicine"
        os.makedirs(image_dir, exist_ok=True)

        file_path = os.path.join(image_dir, filename)
        async with aiofiles.open(file_path, "wb") as outfile:
            await outfile.write(content)

        return f"Doctor picture added at: {file_path}"

    @post("/add", dto=AddUserMedicineAssociationDTO)
    async def user_add_medicine(
        self,
        session: AsyncSession,
        request: "Request[User, Token, Any]",
        data: DTOData[UserMedicineAssociationSchema],
    ) -> str:
        medicine = await get_medicine_by_id(session, data.as_builtins()["medicine_id"])
        new_medicine = data.create_instance(
            id=uuid7(),
            medicine_name=medicine.name,
            current_amount=data.as_builtins()["total"],
            user_id=request.user,
            bought_on=datetime.date.today(),
            days=[],
        )
        user = await get_user_by_id(session, request.user)
        days = []
        for i in data.as_builtins()["days"]:
            days.append(await get_day_by_name(session, i.day))

        user_medicine_association = UserMedicineAssociation(**new_medicine.__dict__)
        user_medicine_association.days = days
        user.medicines.append(user_medicine_association)

        await session.commit()
        return "Medicine Added successfully"

    @post("/remove/{medicine_id:str}")
    async def remove_muser_medicine(
        self,
        medicine_id: str,
        session: AsyncSession,
        request: "Request[User, Token, Any]",
    ) -> str:
        user = await get_user_by_id(session, request.user)
        query = (
            select(UserMedicineAssociation)
            .where(UserMedicineAssociation.user_id == request.user)
            .where(UserMedicineAssociation.medicine_id == medicine_id)
        )
        result = await session.execute(query)
        user_medicine = result.scalar_one_or_none()
        user.medicines.remove(user_medicine)
        await session.execute(query)
        return "deleted successfully"

    @post("/take/{medicine_id: str}")
    async def take_medicine(
        self,
        request: "Request[User, Token, Any]",
        session: AsyncSession,
        medicine_id: str,
    ) -> str:
        user = await get_user_by_id(session, request.user)
        await subtract_dosage(session, user.id, medicine_id)


from models.user_medicine import UserMedicineAssociation  # noqa: E402
