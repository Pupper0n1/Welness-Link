from __future__ import annotations

from litestar.contrib.sqlalchemy.base import UUIDBase
from sqlalchemy import Column, ForeignKey, Table

company_medicine_association = Table(
    "company_medicine_association_table",
    UUIDBase.metadata,
    Column("company_id", ForeignKey("company_table.id"), primary_key=True),
    Column("medicine_id", ForeignKey("medicine_table.id"), primary_key=True),
)
