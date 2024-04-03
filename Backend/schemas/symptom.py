from __future__ import annotations

from typing import TYPE_CHECKING, Optional
import argon2
from uuid import UUID

from datetime import date, datetime

from litestar.dto import DTOConfig
from litestar.contrib.pydantic import PydanticDTO
from .schema import Schema



class SymptomSchema(Schema):
    id: UUID
    name: str
    description: str




# Define a DTO for user data
class SymptomDTO(PydanticDTO[SymptomSchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy='camel',
    )

class CreateSymptomDTO(SymptomDTO):
    config = DTOConfig(
        include={'name', 'description'},
        rename_strategy='camel'
    )


