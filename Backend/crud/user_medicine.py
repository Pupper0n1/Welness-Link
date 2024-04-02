from sqlalchemy import create_engine, select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user_medicine import UserMedicine
import re
import uuid


'''
Helper function that Converts the given value to milligrams (mg) based on its unit.
'''
async def convert_to_mg(value, unit):
    if unit == "mg":
        return value
    elif unit == "g":
        return value * 1000  # 1 gram = 1000 milligrams
    else:
        raise ValueError("Unsupported unit")


'''
Helper function that subtracts the dosage from the current amount of a UserMedicine record.
'''
async def subtract_dosage(session: AsyncSession, user_id, medicine_id):
    query = select(UserMedicine).filter_by(user_id=user_id, medicine_id=medicine_id)
    result = await session.execute(query)
    user_medicine = result.scalar_one_or_none()
    if user_medicine:
        # Use regular expressions to extract numbers and units
        dosage_match = re.match(r"([0-9.]+)([a-zA-Z]+)", user_medicine.dosage)
        current_amount_match = re.match(r"([0-9.]+)([a-zA-Z]+)", user_medicine.current_amount)

        if dosage_match and current_amount_match:
            dosage_value, dosage_unit = float(dosage_match.group(1)), dosage_match.group(2)
            current_amount_value, current_amount_unit = float(current_amount_match.group(1)), current_amount_match.group(2)
            
            # Convert both to mg (or any common unit) before subtraction
            try:
                dosage_in_mg = await convert_to_mg(dosage_value, dosage_unit)
                current_amount_in_mg = await convert_to_mg(current_amount_value, current_amount_unit)

                new_current_amount_in_mg = current_amount_in_mg - dosage_in_mg
                
                # Update the current_amount, converting back to the original unit if necessary
                user_medicine.current_amount = str(new_current_amount_in_mg) + "mg"
                session.commit()
                print(f"Updated current amount: {new_current_amount_in_mg}mg")
            except ValueError as e:
                print(f"Error in unit conversion: {e}")
        else:
            print("Error parsing dosage or current amount.")
    else:
        print("UserMedicine record not found.")
