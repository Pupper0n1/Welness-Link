from sqlalchemy import select, delete, orm
from sqlalchemy.ext.asyncio import AsyncSession
from litestar.exceptions import HTTPException
from uuid import UUID

from models.company import Company
from schemas.company import CompanySchema

async def get_company_list(session: AsyncSession, limit, offset) -> list[CompanySchema]:
    query = select(Company).limit(limit).offset(offset)
    result = await session.execute(query)
    return result.scalars().all()


async def get_company_by_name(session: AsyncSession, name: str) -> list[CompanySchema]:
    query = select(Company).where(Company.name == name)
    result = await session.execute(query)
    return result.scalar_one_or_none()
