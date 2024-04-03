from models.day import Day
from schemas.day import DaySchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def get_days_list(session: AsyncSession) -> list[DaySchema]:
    query = select(Day)
    result = await session.execute(query)
    return result.scalars().all()


async def get_day_by_id(session: AsyncSession, day_id: str) -> Day:
    query = select(Day).where(Day.id == day_id)
    result = await session.execute(query)
    return result.scalar_one_or_none()


async def get_day_by_name(session: AsyncSession, day_name: str) -> Day:
    query = select(Day).where(Day.day == day_name)
    result = await session.execute(query)
    return result.scalar_one_or_none()
