from models.symptom import Symptom
from models.user_symptom import UserSymptom

from sqlalchemy import select, delete
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


async def get_user_symptom_by_id(session: AsyncSession, user_id, symptom_id):
    query = select(UserSymptom).filter_by(
        user_id=user_id, symptom_id=symptom_id
    )
    result = await session.execute(query)
    return result.scalar_one()

async def delete_user_symptom_by_id(session: AsyncSession, user_id, symptom_id):
    query = delete(UserSymptom).filter_by(
        user_id=user_id, symptom_id=symptom_id
    )
    await session.execute(query)
