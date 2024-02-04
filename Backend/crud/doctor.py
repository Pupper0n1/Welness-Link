from sqlalchemy import select, delete, orm
from sqlalchemy.ext.asyncio import AsyncSession
from litestar.exceptions import HTTPException
from uuid import UUID

from models.doctor import Doctor
from schemas.medicine import MedicineSchema

async def get_doctor_list(session: AsyncSession, limit, offset) -> list[MedicineSchema]:
    query = select(Doctor).limit(limit).offset(offset)
    result = await session.execute(query)
    return result.scalars().all()



async def get_doctor_by_id(session: AsyncSession, doctor_id: UUID) -> Doctor:
    query = select(Doctor).where(Doctor.id == doctor_id)

    result = await session.execute(query)
    return result.scalar_one_or_none()