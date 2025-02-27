from uuid import UUID

from models.medicine import Medicine
from schemas.medicine import MedicineSchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user_medicine import UserMedicineAssociation

from datetime import date

from models.day import Day
import calendar

from crud.day import get_day_by_name


async def get_medicine_list(
    session: AsyncSession, limit, offset
) -> list[MedicineSchema]:
    query = select(Medicine).limit(limit).offset(offset)
    result = await session.execute(query)
    return result.scalars().all()


async def get_medicine_by_id(session: AsyncSession, medicine_id: UUID) -> Medicine:
    query = select(Medicine).where(Medicine.id == medicine_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()


async def get_medicine_by_name(session: AsyncSession, medicine_name: str) -> Medicine:
    query = select(Medicine).where(Medicine.name == medicine_name)
    result = await session.execute(query)
    return result.scalar_one_or_none()



async def get_user_medicines_today(session: AsyncSession, user_id: UUID) -> UserMedicineAssociation:
    day = await get_day_by_name(session, calendar.day_name[date.today().weekday()])
    query = select(UserMedicineAssociation).where(UserMedicineAssociation.user_id == user_id).where(UserMedicineAssociation.days.contains(day))
    result = await session.execute(query)
    return result.scalars().all()

