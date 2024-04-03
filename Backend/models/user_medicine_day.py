from __future__ import annotations

from litestar.contrib.sqlalchemy.base import UUIDBase
from sqlalchemy import Column, ForeignKey, Table

user_medicine_day = Table(
    "user_medicine_day_association_table",
    UUIDBase.metadata,
    Column(
        "user_medicine_id",
        ForeignKey("user_medicine_association_table.id"),
        primary_key=True,
    ),
    Column("day_id", ForeignKey("day_table.id"), primary_key=True),
)
