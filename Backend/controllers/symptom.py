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
from schemas.symptom import SymptomSchema, SymptomDTO
from crud.symptom import get_symptom_list

class SymptomController(Controller):
    path = "/symptom"
    return_dto = SymptomDTO

    @get("/", exclude_from_auth=True)
    async def get_symptoms(
        self,
        request: "Request[User, Token, Any]",
        session: AsyncSession,
        limit: int = 100,
        offset: int = 0,
    ) -> list[SymptomSchema]:
        user = await get_symptom_list(session, limit, offset)
        return user
    
