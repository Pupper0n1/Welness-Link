from __future__ import annotations

from datetime import date
from typing import Optional
from uuid import UUID

from litestar.contrib.pydantic import PydanticDTO
from litestar.dto import DTOConfig

from .schema import Schema


class UserSymptomSchema(Schema):
    user_id: UUID
    symptom_id: UUID
    symptom_name: str

    date: date
    intensity: int
    notes: Optional[str]


class UserSymptomDTO(PydanticDTO[UserSymptomSchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy="camel",
    )


class AddUserSymptomDTO(UserSymptomDTO):
    config = DTOConfig(
        include={"symptom_id", "date", "intensity", "notes"},
        rename_strategy="camel",
    )


# class UserMedicineAssociationDTO(PydanticDTO[UserSymptomSchema]):
#     config = DTOConfig(
#         max_nested_depth=2,
#         rename_strategy="camel",
#     )


# class AddUserMedicineAssociationDTO(UserMedicineAssociationDTO):
#     config = DTOConfig(
#         include={"medicine_id", "dosage", "expires", "total", "days.0.day"},
#         rename_strategy="camel",
#     )


# class SymptomSchema(Schema):
#     id: UUID
#     name: str
#     description: str
