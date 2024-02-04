from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, Date, UUID
import datetime
from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase
from .user_medicine import  UserMedicineAssociation


class Appointment(UUIDAuditBase):
    __tablename__ = 'appointment_table'

    user_id = Column(UUID, ForeignKey('user_table.id'))
    doctor_id = Column(UUID, ForeignKey('doctor_table.id'))

    date = Column(DateTime)
    description = Column(String)

    doctor = relationship('Doctor', back_populates='appointments')
    user = relationship('User', back_populates='appointments')

