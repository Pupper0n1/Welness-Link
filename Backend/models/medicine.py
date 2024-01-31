from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, UUID, ForeignKey
import datetime
from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase

from models.company import Company

class Medicine(UUIDBase):
    __tablename__ = 'medicine_table'
    name: Mapped[str] = mapped_column(String(255), unique=True)
    DIN: Mapped[int] = mapped_column(Integer)
    Notes: Mapped[str] = mapped_column(Text)
    usage: Mapped[str] = mapped_column(String(255))
    type: Mapped[str] = mapped_column(String(255))
    image: Mapped[str] = mapped_column(String(255), nullable=True)


    company_id: Mapped[UUID] = mapped_column(ForeignKey('company_table.id'))


