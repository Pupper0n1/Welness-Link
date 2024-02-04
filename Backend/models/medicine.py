from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, UUID, ForeignKey
import datetime
from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase
from .company_medicine import company_medicine_association

if TYPE_CHECKING:
    from .company import Company

class Medicine(UUIDBase):
    __tablename__ = 'medicine_table'
    name: Mapped[str] = mapped_column(String(255), unique=True)
    DIN: Mapped[int] = mapped_column(Integer)
    Notes: Mapped[str] = mapped_column(Text)
    usage: Mapped[str] = mapped_column(String(255))
    type: Mapped[str] = mapped_column(String(255))
    image: Mapped[str] = mapped_column(String(255), nullable=True, default=None)


    company_id: Mapped[UUID] = mapped_column(ForeignKey('company_table.id'))
    companies: Mapped[list['Company']] = relationship(
        secondary=company_medicine_association,
        back_populates='medicines',
        lazy='selectin'
    )

    users = relationship('UserMedicineAssociation', back_populates='medicine')


