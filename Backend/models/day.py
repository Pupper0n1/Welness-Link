from typing import TYPE_CHECKING

from litestar.contrib.sqlalchemy.base import UUIDBase
from sqlalchemy import String
from sqlalchemy.orm import relationship, Mapped, mapped_column



class Day(UUIDBase):
    __tablename__ = 'day_table'
    day: Mapped[str] = mapped_column(String(10), unique=True)
