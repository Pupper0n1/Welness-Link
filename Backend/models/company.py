from typing import TYPE_CHECKING

from litestar.contrib.sqlalchemy.base import UUIDBase
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .company_medicine import company_medicine_association

if TYPE_CHECKING:
    from .medicine import Medicine


class Company(UUIDBase):
    __tablename__ = "company_table"
    name: Mapped[str] = mapped_column(String(255), unique=True)
    logo: Mapped[str] = mapped_column(String(255), nullable=True)

    address_street = mapped_column(String(255), nullable=True)
    address_zip = mapped_column(String(255), nullable=True)
    address_city = mapped_column(String(255), nullable=True)
    address_province = mapped_column(String(255), nullable=True)
    address_country = mapped_column(String(255), nullable=True)

    medicines: Mapped[list["Medicine"]] = relationship(
        secondary=company_medicine_association,
        back_populates="companies",
        lazy="selectin",
    )
