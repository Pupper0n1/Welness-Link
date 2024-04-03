from models.symptom import Symptom

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def get_symptom_list(session: AsyncSession, limit, offset) -> list[Symptom]:
    query = select(Symptom).limit(limit).offset(offset)
    result = await session.execute(query)
    return result.scalars().all()


async def get_symptom_by_id(session: AsyncSession, symptom_id: int) -> Symptom:
    query = select(Symptom).where(Symptom.id == symptom_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()


async def get_symptom_by_name(session: AsyncSession, symptom_name: str) -> Symptom:
    query = select(Symptom).where(Symptom.name == symptom_name)
    result = await session.execute(query)
    return result.scalar_one_or_none()
