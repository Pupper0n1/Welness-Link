from __future__ import annotations

from datetime import date
from uuid import UUID

from litestar.contrib.pydantic import PydanticDTO
from litestar.dto import DTOConfig

from .day import DaySchema
from .schema import Schema


class UserMedicineAssociationSchema(Schema):
    user_id: UUID
    medicine_id: UUID
    medicine_name: str

    dosage: int
    bought_on: date
    expires: date

    total: int
    current_amount: int

    days: list[DaySchema] = []


class UserMedicineAssociationDTO(PydanticDTO[UserMedicineAssociationSchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy="camel",
    )


class AddUserMedicineAssociationDTO(UserMedicineAssociationDTO):
    config = DTOConfig(
        include={"medicine_id", "dosage", "expires", "total", "days.0.day"},
        rename_strategy="camel",
    )
