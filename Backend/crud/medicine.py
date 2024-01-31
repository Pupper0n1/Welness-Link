from sqlalchemy import select, delete, orm
from sqlalchemy.ext.asyncio import AsyncSession
from litestar.exceptions import HTTPException
from uuid import UUID

from models.medicine import Medicine
from schemas.medicine import MedicineSchema

async def get_medicine_list(session: AsyncSession, limit, offset) -> list[MedicineSchema]:
    query = select(Medicine).limit(limit).offset(offset)
    result = await session.execute(query)
    return result.scalars().all()