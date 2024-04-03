# Import necessary modules and libraries
import os
from typing import Annotated

import aiofiles
from crud.company import get_company_by_id, get_company_by_name, get_company_list
from litestar import Controller, MediaType, get, patch, post
from litestar.datastructures import UploadFile
from litestar.dto import DTOData
from litestar.enums import RequestEncodingType
from litestar.params import Body
from models.company import Company
from schemas.company import (
    CompanyDTO,
    CompanySchema,
    CreateCompanyDTO,
    UpdateCompanyDTO,
)
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7


class CompanyController(Controller):
    path = "/company"
    return_dto = CompanyDTO

    @get("/", exclude_from_auth=True)
    async def get_companies(
        self, session: AsyncSession, limit: int = 100, offset: int = 0
    ) -> list[CompanySchema]:
        user = await get_company_list(session, limit, offset)
        return user

    @post("/", dto=CreateCompanyDTO)
    async def create_company(
        self, session: AsyncSession, data: DTOData[CompanySchema]
    ) -> CompanySchema:
        company_data = data.create_instance(
            id=uuid7(),
            logo=None,
            address_street=None,
            address_zip=None,
            address_city=None,
            address_province=None,
            address_country=None,
            medicines=[],
        )

        validated_company_data = CompanySchema.model_validate(company_data)
        session.add(Company(**validated_company_data.__dict__))

        await session.commit()
        return validated_company_data

    @get("/{id_or_name:str}")
    async def get_company_with_name(
        self, session: AsyncSession, id_or_name: str
    ) -> CompanySchema:
        try:
            company = await get_company_by_name(session, id_or_name)
        except:
            print("Failed id trying")
        try:
            company = await get_company_by_id(session, id_or_name)
        except Exception:
            return "Error: {e}"
        return CompanySchema.model_validate(company)

    @patch("/{company_id: str}", dto=UpdateCompanyDTO)
    async def update_company(
        self, session: AsyncSession, company_id: str, data: DTOData[CompanySchema]
    ) -> CompanySchema:
        company = await get_company_by_id(session, company_id)
        data.update_instance(company)
        return CompanySchema.model_validate(company)

    @patch("/{company_id:str}/image", media_type=MediaType.TEXT)
    async def update_company_picture(
        self,
        company_id: str,
        session: AsyncSession,
        data: Annotated[UploadFile, Body(media_type=RequestEncodingType.MULTI_PART)],
    ) -> str:
        company = await get_company_by_id(session, company_id)
        content = await data.read()
        filename = f"{company.id}.jpg"

        image_dir = "static/images/companies"
        os.makedirs(image_dir, exist_ok=True)

        file_path = os.path.join(image_dir, filename)
        async with aiofiles.open(file_path, "wb") as outfile:
            await outfile.write(content)

        return f"Doctor picture added at: {file_path}"
