from litestar.contrib.sqlalchemy.base import UUIDBase
from sqlalchemy import UUID, Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.schema import UniqueConstraint

from .day import Day
from .user_medicine_day import user_medicine_day


class UserMedicineAssociation(UUIDBase):
    __tablename__ = "user_medicine_association_table"

    user_id = Column(UUID, ForeignKey("user_table.id"))
    medicine_id = Column(UUID, ForeignKey("medicine_table.id"))
    medicine_name = Column(String)

    # dosage = Column(String)
    dosage = Column(Integer)
    bought_on = Column(Date)
    expires = Column(Date)

    total = Column(Integer)
    current_amount = Column(Integer)

    medicine = relationship("Medicine", back_populates="users")
    user = relationship("User", back_populates="medicines")

    days: Mapped[list[Day]] = relationship(secondary=user_medicine_day, lazy="selectin")

    __table_args__ = (UniqueConstraint("user_id", "medicine_id"),)
