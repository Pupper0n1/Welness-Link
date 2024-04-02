from sqlalchemy import select
from models.medicine import Medicine
from models.company import Company
from models.doctor import Doctor
from models.user import User
from schemas.user import UserSchema
from sqlalchemy.ext.asyncio import AsyncSession
from faker import Faker

from uuid_extensions import uuid7
from datetime import date


async def seed_data(session: AsyncSession):
    company1 = Company(
        id=uuid7(),
        name="Pfizer",
        logo="phizer.png",
        address_street="123 Main St",
        address_zip="T2A 1A1",
        address_city="Toronto",
        address_province="Ontario",
        address_country="Canada",
        medicines=[]
    )

    medicine1 = Medicine(
        id=uuid7(),
        name="Vitamin C",
        DIN=123456,
        Notes="Take with food",
        usage="Once a day",
        type="Vitamin",
        image=None,
        company_id=company1.id
    )

    medicine2 = Medicine(
        id=uuid7(),
        name="Ibuprofen",
        DIN=234567,
        Notes="May cause drowsiness or dizziness",
        usage="Every 4-6 hours as needed",
        type="Nonsteroidal anti-inflammatory drug (NSAID)",
        image=None,
        company_id=company1.id
    )

    medicine3 = Medicine(
        id=uuid7(),
        name="Metformin",
        DIN=345678,
        Notes="Take with meals to reduce stomach upset",
        usage="Twice a day with meals",
        type="Antidiabetic medication",
        image=None,
        company_id=company1.id
    )

    medicine4 = Medicine(
        id=uuid7(),
        name="Amoxicillin",
        DIN=456789,
        Notes="Complete the full course even if you feel better",
        usage="Every 8 hours for 7 days",
        type="Antibiotic",
        image=None,
        company_id=company1.id
    )

    medicine5 = Medicine(
        id=uuid7(),
        name="Lisinopril",
        DIN=567890,
        Notes="Avoid potassium supplements",
        usage="Once daily",
        type="ACE inhibitor",
        image=None,
        company_id=company1.id
    )

    company1.medicines.extend([medicine1, medicine2, medicine3, medicine4, medicine5])


    company2 = Company(
        id=uuid7(),
        name="Moderna",
        logo="moderna.png",
        address_street="456 Sunset Blvd",
        address_zip="T2N 1N4",
        address_city="Vancouver",
        address_province="Ontario",
        address_country="Canada",
        medicines=[]
    )

    medicine6 = Medicine(
        id=uuid7(),
        name="Atorvastatin",
        DIN=678901,
        Notes="Take once a day in the evening",
        usage="Once daily",
        type="Statins",
        image=None,
        company_id=company2.id
    )

    medicine7 = Medicine(
        id=uuid7(),
        name="Levothyroxine",
        DIN=789012,
        Notes="Take on an empty stomach, 30 to 60 minutes before breakfast",
        usage="Once daily in the morning",
        type="Thyroid hormone",
        image=None,
        company_id=company2.id
    )

    medicine8 = Medicine(
        id=uuid7(),
        name="Amlodipine",
        DIN=890123,
        Notes="May cause swelling in the feet or ankles",
        usage="Once daily",
        type="Calcium channel blocker",
        image=None,
        company_id=company2.id
    )

    medicine9 = Medicine(
        id=uuid7(),
        name="Albuterol",
        DIN=901234,
        Notes="Use 15 minutes before exercise or as needed",
        usage="As needed",
        type="Bronchodilator",
        image=None,
        company_id=company2.id
    )

    medicine10 = Medicine(
        id=uuid7(),
        name="Prednisone",
        DIN=492303,
        Notes="Take with food to reduce stomach irritation",
        usage="Varies depending on condition",
        type="Corticosteroid",
        image=None,
        company_id=company2.id
    )

    company2.medicines.extend([medicine6, medicine7, medicine8, medicine9, medicine10])


    company3 = Company(
        id=uuid7(),
        name="AstraZeneca",
        logo="astra.png",
        address_street="123 Main St",
        address_zip="12345",
        address_city="Toronto",
        address_province="Ontario",
        address_country="Canada",
        medicines=[]
    )

    medicine11 = Medicine(
        id=uuid7(),
        name="Omeprazole",
        DIN=1234567,
        Notes="Take 30 minutes before a meal",
        usage="Once daily in the morning",
        type="Proton pump inhibitor",
        image=None,
        company_id=company3.id
    )

    medicine12 = Medicine(
        id=uuid7(),
        name="Losartan",
        DIN=2345678,
        Notes="May cause dizziness in the first few days",
        usage="Once daily",
        type="Angiotensin II receptor blocker",
        image=None,
        company_id=company3.id
    )

    medicine13 = Medicine(
        name="Cetirizine",
        DIN=3456789,
        Notes="Non-drowsy formula available, but may still cause some drowsiness",
        usage="Once daily",
        type="Antihistamine",
        image=None,
        company_id=company3.id
    )

    medicine14 = Medicine(
        id=uuid7(),
        name="Fluoxetine",
        DIN=4567890,
        Notes="May take 4 to 6 weeks to notice improvement",
        usage="Once daily in the morning",
        type="Selective serotonin reuptake inhibitor (SSRI)",
        image=None,
        company_id=company3.id
    )

    medicine15 = Medicine(
        id=uuid7(),
        name="Insulin glargine",
        DIN=5678901,
        Notes="Inject subcutaneously once a day at the same time every day",
        usage="Once daily",
        type="Long-acting insulin",
        image=None,
        company_id=company3.id
    )

    company3.medicines.extend([medicine11, medicine12, medicine13, medicine14, medicine15])

    doctor1 = Doctor (
        id=uuid7(),
        name="Ethan Anderson",
        email="ethan.anderson@gmail.com",
        profile_picture="ethan.jpg",
        specialty="Cardiology",
    )

    doctor2 = Doctor (
        id=uuid7(),
        name="Emma Roberts",
        email="emma.roberts@gmail.com",
        profile_picture="emma.jpg",
        specialty="Orthopedics",
    )

    doctor3 = Doctor (
        id=uuid7(),
        name="Noah Thompson",
        email="noah.thompson@gmail.com",
        profile_picture="noah.jpg",
        specialty="Dermatology",
    )

    doctor4 = Doctor (
        id=uuid7(),
        name="Olivia Johnson",
        email="olivia.johnson@gmail.com",
        profile_picture="olivia.jpg",
        specialty="Neurology",
    )

    doctor5 = Doctor (
        id=uuid7(),
        name="Alexander Mitchell",
        email="alexander.mitchell@gmail.com",
        profile_picture="alexander.jpg",
        specialty="Gynecology",
    )

    session.add_all([company1, company2, company3, doctor1, doctor2, doctor3, doctor4, doctor5])

    ## Users

    # user1 = User(
    #     id=uuid7(),
    #     first_name="Jane",
    #     last_name="Doe",
    #     email="jane.doe@email.com",
    #     profile_picture=None,
    #     password="password",
    #     medicines=[medicine1, medicine2, medicine3],
    #     appointments=[]
    # )



# class User(UUIDAuditBase):
#     __tablename__ = 'user_table'
#     username : Mapped[str] = mapped_column(String(100), unique=True)
#     first_name: Mapped[str] = mapped_column(String(100))
#     last_name: Mapped[str] = mapped_column(String(100))
#     email: Mapped[str] = mapped_column(String(100))
#     profile_picture: Mapped[str] = mapped_column(String(100), nullable=True)
#     password: Mapped[str] = mapped_column(String(255))




#     medicines = relationship(UserMedicineAssociation, back_populates='user', lazy='selectin')
#     appointments = relationship(Appointment, back_populates='user', lazy='selectin')