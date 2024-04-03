from typing import TYPE_CHECKING

from litestar.contrib.sqlalchemy.base import UUIDBase
from sqlalchemy import UUID, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .company_medicine import company_medicine_association

if TYPE_CHECKING:
    from .company import Company


class Medicine(UUIDBase):
    __tablename__ = "medicine_table"
    name: Mapped[str] = mapped_column(String(255), unique=True)
    DIN: Mapped[int] = mapped_column(Integer)
    Notes: Mapped[str] = mapped_column(Text)
    usage: Mapped[str] = mapped_column(String(255))
    type: Mapped[str] = mapped_column(String(255))
    image: Mapped[str] = mapped_column(String(255), nullable=True, default=None)

    company_id: Mapped[UUID] = mapped_column(ForeignKey("company_table.id"))
    companies: Mapped[list["Company"]] = relationship(
        secondary=company_medicine_association,
        back_populates="medicines",
        lazy="selectin",
    )

    users = relationship(
        "UserMedicineAssociation",
        back_populates="medicine",
        cascade="all, delete-orphan",
    )
