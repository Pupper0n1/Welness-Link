from models.user_medicine import UserMedicineAssociation
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def subtract_dosage(session: AsyncSession, user_id, medicine_id):
    query = select(UserMedicineAssociation).filter_by(
        user_id=user_id, medicine_id=medicine_id
    )
    result = await session.execute(query)
    user_medicine = result.scalar_one()
    user_medicine.current_amount -= user_medicine.dosage
    if user_medicine.current_amount < 0:
        user_medicine.current_amount = 0
    await session.commit()


async def get_user_medicine_by_id(session: AsyncSession, user_id, medicine_id):
    query = select(UserMedicineAssociation).filter_by(
        user_id=user_id, medicine_id=medicine_id
    )
    result = await session.execute(query)
    return result.scalar_one()
