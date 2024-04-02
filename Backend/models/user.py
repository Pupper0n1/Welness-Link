from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Column, Integer, String, Boolean, DateTime
import datetime
from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase
from .user_medicine import  UserMedicineAssociation
from .appointment import Appointment

class User(UUIDAuditBase):
    __tablename__ = 'user_table'
    username : Mapped[str] = mapped_column(String(100), unique=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(100))
    profile_picture: Mapped[str] = mapped_column(String(100), nullable=True)
    password: Mapped[str] = mapped_column(String(255))




    medicines = relationship(UserMedicineAssociation, back_populates='user', lazy='selectin', cascade='all, delete-orphan')
    appointments = relationship(Appointment, back_populates='user', lazy='selectin', cascade='all, delete-orphan')