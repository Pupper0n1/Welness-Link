from litestar.contrib.sqlalchemy.base import UUIDAuditBase
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .appointment import Appointment
from .user_medicine import UserMedicineAssociation
from .user_symptom import UserSymptom


class User(UUIDAuditBase):
    __tablename__ = "user_table"
    username: Mapped[str] = mapped_column(String(100), unique=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(100))
    profile_picture: Mapped[str] = mapped_column(String(100), nullable=True)
    password: Mapped[str] = mapped_column(String(255))

    medicines = relationship(
        UserMedicineAssociation,
        back_populates="user",
        lazy="selectin",
        cascade="all, delete-orphan",
    )
    appointments = relationship(
        Appointment,
        back_populates="user",
        lazy="selectin",
        cascade="all, delete-orphan",
    )
    symptoms = relationship(
        UserSymptom,
        back_populates="user",
        lazy="selectin",
        cascade="all, delete-orphan",
    )
