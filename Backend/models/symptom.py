from litestar.contrib.sqlalchemy.base import UUIDBase
from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Symptom(UUIDBase):
    __tablename__ = "symptom_table"

    name: Mapped[str] = mapped_column(String(255), unique=True)
    description: Mapped[str] = mapped_column(Text)

    users = relationship(
        "UserSymptom", back_populates="symptom", cascade="all, delete-orphan"
    )
