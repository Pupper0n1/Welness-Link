# from typing import TYPE_CHECKING, Optional

# from sqlalchemy.orm import relationship, DeclarativeBase, Mapped, mapped_column
# from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, UUID, ForeignKey, Date
# import datetime
# from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase
# from .company_medicine import company_medicine_association

# if TYPE_CHECKING:
#     from .company import Company

# class Symptom(UUIDBase):
#     __tablename__ = 'symptom_table'

#     name: Mapped[str] = mapped_column(String(255), unique=True)

#     start_date: Mapped[datetime.date] = mapped_column(Date)
#     end_date: Mapped

#     notes: Mapped[str] = mapped_column(Text)
#     painfulness: Mapped[int] = mapped_column(Integer)

#     user_id: Mapped[UUID] = mapped_column(ForeignKey('user_table.id'))
#     users: Mapped[list['User']] = relationship(
#         secondary=company_medicine_association,
#         back_populates='medicines'
#     )



# class Day(UUIDBase):
#     __tablename__ = 'day_table'
#     day: Mapped[str] = mapped_column(String(10), unique=True)
