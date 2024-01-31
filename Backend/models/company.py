from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
import datetime
from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase

class Company(UUIDBase):
    __tablename__ = 'company_table'
    name: Mapped[str] = mapped_column(String(255), unique=True)
    logo: Mapped[str] = mapped_column(String(255), nullable=True)

    address_street = mapped_column(String(255), nullable=True)
    address_zip = mapped_column(String(255), nullable=True)
    address_city = mapped_column(String(255), nullable=True)
    address_province = mapped_column(String(255), nullable=True)
    address_country = mapped_column(String(255), nullable=True)
