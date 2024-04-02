from __future__ import annotations

from typing import TYPE_CHECKING, Optional
import argon2
from uuid import UUID

from litestar.dto import DTOConfig
from litestar.contrib.pydantic import PydanticDTO
from .schema import Schema

class MedicineSchema(Schema):
    id: UUID
    name: str
    DIN: int
    Notes: str
    usage: str
    type: str
    image: Optional[str] = None

    company_id: UUID





# Define a DTO for user data
class MedicineDTO(PydanticDTO[MedicineSchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy='camel',
    )

class CreateMedicineDTO(MedicineDTO):
    config = DTOConfig(
        include={'name', 'DIN', 'Notes', 'usage', 'type', 'company_id'},
        rename_strategy='camel',
    )


MedicineSchema.model_rebuild()

