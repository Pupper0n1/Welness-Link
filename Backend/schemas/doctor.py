from __future__ import annotations

from typing import TYPE_CHECKING, Optional
import argon2
from uuid import UUID

from litestar.dto import DTOConfig
from litestar.contrib.pydantic import PydanticDTO
from .schema import Schema

class DoctorSchema(Schema):
    id: UUID
    
    name: str
    email: str
    profile_picture: Optional[str] = None
    specialty: str

    



# Define a DTO for user data
class DoctorDTO(PydanticDTO[DoctorSchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy='camel',
    )

class CreateDoctorDTO(DoctorDTO):
    config = DTOConfig(
        include={'name', 'email', 'specialty'},
        rename_strategy='camel'
    )


DoctorSchema.model_rebuild()

