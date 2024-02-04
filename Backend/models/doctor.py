from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Column, Integer, String, Boolean, DateTime
import datetime
from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase
from .user_medicine import  UserMedicineAssociation


class Doctor(UUIDAuditBase):
    __tablename__ = 'doctor_table'
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(100))
    profile_picture: Mapped[str] = mapped_column(String(100), nullable=True)
    speciality: Mapped[str] = mapped_column(String(100))

    appointments = relationship('Appointment', back_populates='doctor')