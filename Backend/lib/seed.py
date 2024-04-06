from datetime import date, datetime

from models.appointment import Appointment
from models.company import Company
from models.day import Day
from models.doctor import Doctor
from models.medicine import Medicine
from models.user import User
from models.user_medicine import UserMedicineAssociation
from models.symptom import Symptom
from models.user_symptom import UserSymptom
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7

from .hasher import ph


async def seed_data(session: AsyncSession):
    company1 = Company(
        id=uuid7(),
        name="Pfizer",
        logo="phizer.jpg",
        address_street="123 Main St",
        address_zip="T2A 1A1",
        address_city="Toronto",
        address_province="Ontario",
        address_country="Canada",
        medicines=[],
    )

    medicine1 = Medicine(
        id=uuid7(),
        name="Vitamin C",
        DIN=123456,
        Notes="Take with food",
        usage="Once a day",
        type="Vitamin",
        image='123456.jpg',
        company_id=company1.id,
    )

    medicine2 = Medicine(
        id=uuid7(),
        name="Ibuprofen",
        DIN=234567,
        Notes="May cause drowsiness or dizziness",
        usage="Every 4-6 hours as needed",
        type="Nonsteroidal anti-inflammatory drug (NSAID)",
        image='234567.jpg',
        company_id=company1.id,
    )

    medicine3 = Medicine(
        id=uuid7(),
        name="Metformin",
        DIN=345678,
        Notes="Take with meals to reduce stomach upset",
        usage="Twice a day with meals",
        type="Antidiabetic medication",
        image='345678.jpg',
        company_id=company1.id,
    )

    medicine4 = Medicine(
        id=uuid7(),
        name="Amoxicillin",
        DIN=456789,
        Notes="Complete the full course even if you feel better",
        usage="Every 8 hours for 7 days",
        type="Antibiotic",
        image='456789.jpg',
        company_id=company1.id,
    )

    medicine5 = Medicine(
        id=uuid7(),
        name="Lisinopril",
        DIN=567890,
        Notes="Avoid potassium supplements",
        usage="Once daily",
        type="ACE inhibitor",
        image='567890.jpg',
        company_id=company1.id,
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
        medicines=[],
    )

    medicine6 = Medicine(
        id=uuid7(),
        name="Atorvastatin",
        DIN=678901,
        Notes="Take once a day in the evening",
        usage="Once daily",
        type="Statins",
        image='678901.jpg',
        company_id=company2.id,
    )

    medicine7 = Medicine(
        id=uuid7(),
        name="Levothyroxine",
        DIN=789012,
        Notes="Take on an empty stomach, 30 to 60 minutes before breakfast",
        usage="Once daily in the morning",
        type="Thyroid hormone",
        image='789012.jpg',
        company_id=company2.id,
    )

    medicine8 = Medicine(
        id=uuid7(),
        name="Amlodipine",
        DIN=890123,
        Notes="May cause swelling in the feet or ankles",
        usage="Once daily",
        type="Calcium channel blocker",
        image='890123.jpg',
        company_id=company2.id,
    )

    medicine9 = Medicine(
        id=uuid7(),
        name="Albuterol",
        DIN=901234,
        Notes="Use 15 minutes before exercise or as needed",
        usage="As needed",
        type="Bronchodilator",
        image='901234.jpg',
        company_id=company2.id,
    )

    medicine10 = Medicine(
        id=uuid7(),
        name="Prednisone",
        DIN=492303,
        Notes="Take with food to reduce stomach irritation",
        usage="Varies depending on condition",
        type="Corticosteroid",
        image='492303.jpg',
        company_id=company2.id,
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
        medicines=[],
    )

    medicine11 = Medicine(
        id=uuid7(),
        name="Omeprazole",
        DIN=1234567,
        Notes="Take 30 minutes before a meal",
        usage="Once daily in the morning",
        type="Proton pump inhibitor",
        image='1234567.jpg',
        company_id=company3.id,
    )

    medicine12 = Medicine(
        id=uuid7(),
        name="Losartan",
        DIN=2345678,
        Notes="May cause dizziness in the first few days",
        usage="Once daily",
        type="Angiotensin II receptor blocker",
        image='2345678.jpg',
        company_id=company3.id,
    )

    medicine13 = Medicine(
        name="Cetirizine",
        DIN=3456789,
        Notes="Non-drowsy formula available, but may still cause some drowsiness",
        usage="Once daily",
        type="Antihistamine",
        image='3456789.jpg',
        company_id=company3.id,
    )

    medicine14 = Medicine(
        id=uuid7(),
        name="Fluoxetine",
        DIN=4567890,
        Notes="May take 4 to 6 weeks to notice improvement",
        usage="Once daily in the morning",
        type="Selective serotonin reuptake inhibitor (SSRI)",
        image='4567890.jpg',
        company_id=company3.id,
    )

    medicine15 = Medicine(
        id=uuid7(),
        name="Insulin glargine",
        DIN=5678901,
        Notes="Inject subcutaneously once a day at the same time every day",
        usage="Once daily",
        type="Long-acting insulin",
        image='5678901.jpg',
        company_id=company3.id,
    )

    company3.medicines.extend(
        [medicine11, medicine12, medicine13, medicine14, medicine15]
    )

    doctor1 = Doctor(
        id=uuid7(),
        name="Ethan Anderson",
        email="ethan.anderson@gmail.com",
        profile_picture="ethan.jpg",
        specialty="Cardiology",
        appointments=[],
    )

    doctor2 = Doctor(
        id=uuid7(),
        name="Emma Roberts",
        email="emma.roberts@gmail.com",
        profile_picture="emma.jpg",
        specialty="Orthopedics",
        appointments=[],
    )

    doctor3 = Doctor(
        id=uuid7(),
        name="Noah Thompson",
        email="noah.thompson@gmail.com",
        profile_picture="noah.jpg",
        specialty="Dermatology",
        appointments=[],
    )

    doctor4 = Doctor(
        id=uuid7(),
        name="Olivia Johnson",
        email="olivia.johnson@gmail.com",
        profile_picture="olivia.jpg",
        specialty="Neurology",
        appointments=[],
    )

    doctor5 = Doctor(
        id=uuid7(),
        name="Alexander Mitchell",
        email="alexander.mitchell@gmail.com",
        profile_picture="alexander.jpg",
        specialty="Gynecology",
        appointments=[],
    )

    session.add_all(
        [company1, company2, company3, doctor1, doctor2, doctor3, doctor4, doctor5]
    )

    session.add_all([doctor1, doctor2, doctor3, doctor4, doctor5])

    monday = Day(id=uuid7(), day="Monday")

    tuesday = Day(id=uuid7(), day="Tuesday")

    wednesday = Day(id=uuid7(), day="Wednesday")

    thursday = Day(id=uuid7(), day="Thursday")

    friday = Day(id=uuid7(), day="Friday")

    saturday = Day(id=uuid7(), day="Saturday")

    sunday = Day(id=uuid7(), day="Sunday")

    session.add_all([monday, tuesday, wednesday, thursday, friday, saturday, sunday])

    user1 = User(
        id=uuid7(),
        username="jane.doe",
        first_name="Jane",
        last_name="Doe",
        email="jane.doe@email.com",
        profile_picture=None,
        password=ph.hash("password"),
        medicines=[],
        appointments=[],
    )

    user1_medicine_1 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine1.id,
        medicine_name=medicine1.name,
        dosage=500,
        bought_on=date(2023, 3, 1),
        expires=date(2025, 6, 1),
        total=30,
        current_amount=30,
        days=[monday, wednesday, friday],
    )

    user1_medicine_6 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine3.id,
        medicine_name=medicine3.name,
        dosage=500,
        bought_on=date(2023, 6, 11),
        expires=date(2023, 9, 11),
        total=30,
        current_amount=30,
        days=[tuesday, thursday, saturday],
    )

    user1_medicine_11 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine5.id,
        medicine_name=medicine5.name,
        dosage=10,
        bought_on=date(2023, 9, 21),
        expires=date(2025, 9, 21),
        total=30,
        current_amount=30,
        days=[sunday],
    )

    user1.medicines.extend([user1_medicine_1, user1_medicine_6, user1_medicine_11])

    user2 = User(
        id=uuid7(),
        username="andrew_musa",
        first_name="Andrew",
        last_name="Musa",
        email="andrew.musa@ucalgary.ca",
        profile_picture=None,
        password=ph.hash("password"),
        medicines=[],
        appointments=[],
    )

    user_2_medicine_2 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine2.id,
        medicine_name=medicine2.name,
        dosage=200,
        bought_on=date(2022, 3, 1),
        expires=date(2024, 7, 1),
        total=30,
        current_amount=30,
        days=[monday, wednesday, friday],
    )

    user_2_medicine_7 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine4.id,
        medicine_name=medicine4.name,
        dosage=500,
        bought_on=date(2022, 6, 11),
        expires=date(2024, 7, 1),
        total=30,
        current_amount=30,
        days=[tuesday, thursday, saturday],
    )

    user_2_medicine_12 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine6.id,
        medicine_name=medicine6.name,
        dosage=10,
        bought_on=date(2022, 9, 21),
        expires=date(2024, 7, 1),
        total=30,
        current_amount=30,
        days=[sunday],
    )

    user2.medicines.extend([user_2_medicine_2, user_2_medicine_7, user_2_medicine_12])

    user3 = User(
        id=uuid7(),
        username="wilbur",
        first_name="Wilbur",
        last_name="Elbouni",
        email="wilbur.elbouni@ucalgary.ca",
        profile_picture=None,
        password=ph.hash("password"),
        medicines=[],
        appointments=[],
    )

    user3_medicine_3 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine3.id,
        medicine_name=medicine3.name,
        dosage=500,
        bought_on=date(2023, 3, 1),
        expires=date(2025, 7, 1),
        total=30,
        current_amount=30,
        days=[monday, wednesday, friday],
    )

    user3_medicine_8 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine5.id,
        medicine_name=medicine5.name,
        dosage=10,
        bought_on=date(2023, 6, 11),
        expires=date(2025, 7, 1),
        total=30,
        current_amount=30,
        days=[tuesday, thursday, saturday],
    )

    user3_medicine_13 = UserMedicineAssociation(
        user_id=user1.id,
        medicine_id=medicine7.id,
        medicine_name=medicine7.name,
        dosage=10,
        bought_on=date(2023, 9, 21),
        expires=date(2025, 7, 1),
        total=30,
        current_amount=30,
        days=[sunday],
    )

    user3.medicines.extend([user3_medicine_3, user3_medicine_8, user3_medicine_13])

    app1 = Appointment(
        id=uuid7(),
        user_id=user1.id,
        doctor_id=doctor1.id,
        date=datetime(2023, 1, 14, 10, 30),
        description="Consultation for flu symptoms",
    )

    app2 = Appointment(
        id=uuid7(),
        user_id=user2.id,
        doctor_id=doctor2.id,
        date=datetime(2023, 1, 15, 10, 30),
        description="Follow up on surgery",
    )

    app3 = Appointment(
        id=uuid7(),
        user_id=user3.id,
        doctor_id=doctor3.id,
        date=datetime(2023, 1, 16, 10, 30),
        description="Annual physical",
    )

    session.add_all([user1, user2, user3, app1, app2, app3])


    symptom1 = Symptom(
        id=uuid7(),
        name="Headache",
        description="Pain in the head or neck",
        users=[],
    )

    symptom2 = Symptom(
        id=uuid7(),
        name="Fever",
        description="Elevated body temperature",
        users=[],
    )

    symptom3 = Symptom(
        id=uuid7(),
        name="Cough",
        description="Expelling air from the lungs with a sudden sharp sound",
        users=[],
    )

    symptom4 = Symptom(
        id=uuid7(),
        name="Fatigue",
        description="Extreme tiredness",
        users=[],
    )

    symptom5 = Symptom(
        id=uuid7(),
        name="Nausea",
        description="Feeling sick to the stomach",
        users=[],
    )

    symptom6 = Symptom(
        id=uuid7(),
        name="Diarrhea",
        description="Frequent passage of loose, watery stools",
        users=[],
    )

    symptom7 = Symptom(
        id=uuid7(),
        name="Dizziness",
        description="Feeling unsteady or lightheaded",
        users=[],
    )

    symptom8 = Symptom(
        id=uuid7(),
        name="Shortness of breath",
        description="Difficulty breathing",
        users=[],
    )

    symptom9 = Symptom(
        id=uuid7(),
        name="Chest pain",
        description="Pain or discomfort in the chest",
        users=[],
    )

    symptom10 = Symptom(
        id=uuid7(),
        name="Back pain",
        description="Pain in the back",
        users=[],
    )

    session.add_all([symptom1, symptom2, symptom3, symptom4, symptom5, symptom6, symptom7, symptom8, symptom9, symptom10])


    user_symptom1 = UserSymptom(
        id=uuid7(),
        user_id=user1.id,
        symptom_id=symptom1.id,
        symptom_name=symptom1.name,
        date=date(2023, 1, 14),
        intensity=5,
        notes="Pain started yesterday",
    )

    user_symptom2 = UserSymptom(
        id=uuid7(),
        user_id=user2.id,
        symptom_id=symptom2.id,
        symptom_name=symptom2.name,
        date=date(2023, 1, 15),
        intensity=7,
        notes="Fever started 3 days ago",
    )

    user_symptom3 = UserSymptom(
        id=uuid7(),
        user_id=user3.id,
        symptom_id=symptom3.id,
        symptom_name=symptom3.name,
        date=date(2023, 1, 16),
        intensity=3,
        notes="Coughing for a week",
    )

    session.add_all([user_symptom1, user_symptom2, user_symptom3])

    await session.commit()


# class Appointment(UUIDAuditBase):
#     __tablename__ = 'appointment_table'

#     user_id = Column(UUID, ForeignKey('user_table.id'))
#     doctor_id = Column(UUID, ForeignKey('doctor_table.id'))

#     date = Column(DateTime)
#     description = Column(String)

#     doctor = relationship('Doctor', back_populates='appointments')
#     user = relationship('User', back_populates='appointments')


# class UserMedicineAssociation(UUIDBase):
#     __tablename__ = 'user_medicine_association_table'
#     user_id = Column(UUID, ForeignKey('user_table.id'))
#     medicine_id = Column(UUID, ForeignKey('medicine_table.id'))

#     # dosage = Column(String)
#     dosage = Column(String)
#     bought_on = Column(Date)
#     expires = Column(Date)

#     total = Column(Integer)
#     current_amount = Column(Integer)


#     medicine = relationship('Medicine', back_populates='users')
#     user = relationship('User', back_populates='medicines')

#     days = Column(String)


#     __table_args__ = (
#         UniqueConstraint('user_id', 'medicine_id'),
#     )


# user3 = User(
#     id=uuid7(),
#     username="wilbur",
#     first_name="Wilbur",
#     last_name="Elbouni",
#     email="wilbur.elbouni@ucalgary.ca",
#     profile_picture=None,
#     password=ph.hash("password"),
#     medicines=[medicine7, medicine8, medicine9],
#     appointments=[]
# )


# class Doctor(UUIDAuditBase):
#     __tablename__ = 'doctor_table'
#     name: Mapped[str] = mapped_column(String(255))
#     email: Mapped[str] = mapped_column(String(100))
#     profile_picture: Mapped[str] = mapped_column(String(100), nullable=True)
#     specialty: Mapped[str] = mapped_column(String(100))

#     appointments = relationship('Appointment', back_populates='doctor')


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
