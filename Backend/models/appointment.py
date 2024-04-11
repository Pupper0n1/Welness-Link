from litestar.contrib.sqlalchemy.base import UUIDAuditBase
from sqlalchemy import UUID, Column, DateTime, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import relationship


class Appointment(UUIDAuditBase):
    __tablename__ = "appointment_table"

    user_id = Column(UUID, ForeignKey("user_table.id"))
    doctor_id = Column(UUID, ForeignKey("doctor_table.id"))

    date = Column(DateTime)
    description = Column(String)

    doctor = relationship("Doctor", back_populates="appointments")
    user = relationship("User", back_populates="appointments")

    __table_args__ = (UniqueConstraint("doctor_id", "date"),)
