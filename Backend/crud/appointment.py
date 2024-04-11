from uuid import UUID

from models.appointment import Appointment
from sqlalchemy import select, delete, func
from sqlalchemy.ext.asyncio import AsyncSession

from datetime import date, time, datetime


async def get_appointment_by_id(
    session: AsyncSession, appointment_id: UUID
) -> Appointment:
    query = select(Appointment).where(Appointment.id == appointment_id)
    result = await session.execute(query)
    return result.scalar_one()




async def delete_appointment_by_id(session: AsyncSession, appointment_id: UUID):
    query = delete(Appointment).where(Appointment.id == appointment_id)
    await session.execute(query)



async def get_appointment_list_by_doctor_and_day(session: AsyncSession, doctor_id: UUID, day: date) -> list[Appointment]:
    query = select(Appointment).where(Appointment.doctor_id == doctor_id).filter(Appointment.date >= datetime.combine(day, time.min)).filter(Appointment.date <= datetime.combine(day, time.max))
    result = await session.execute(query)
    return result.scalars().all()