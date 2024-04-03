from litestar.contrib.sqlalchemy.base import UUIDAuditBase
from sqlalchemy import (
    UUID,
    Column,
    Date,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from .symptom import Symptom

class UserSymptom(UUIDAuditBase):
    __tablename__ = "user_symptom_table"

    user_id = Column(UUID, ForeignKey("user_table.id"))
    symptom_id = Column(UUID, ForeignKey("symptom_table.id"))
    symptom_name = Column(String)

    date = Column(Date)
    intensity = Column(Integer)
    notes = Column(String)

    symptom = relationship(Symptom, back_populates="users")
    user = relationship("User", back_populates="symptoms")

    __table_args__ = (UniqueConstraint("user_id", "symptom_id"),)
