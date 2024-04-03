from uuid import UUID

from models.appointment import Appointment
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession


async def get_appointment_by_id(
    session: AsyncSession, appointment_id: UUID
) -> Appointment:
    query = select(Appointment).where(Appointment.id == appointment_id)
    result = await session.execute(query)
    return result.scalar_one()




async def delete_appointment_by_id(session: AsyncSession, appointment_id: UUID):
    query = delete(Appointment).where(Appointment.id == appointment_id)
    await session.execute(query)
