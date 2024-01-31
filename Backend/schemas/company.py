from __future__ import annotations

from typing import TYPE_CHECKING, Optional
import argon2
from uuid import UUID

from litestar.dto import DTOConfig
from litestar.contrib.pydantic import PydanticDTO
from .schema import Schema


class CompanySchema(Schema):
    id: UUID
    name: str
    logo: Optional[str]

    address_street: Optional[str]
    address_zip: Optional[str]
    address_city: Optional[str]
    address_province: Optional[str]
    address_country: Optional[str]





# Define a DTO for user data
class CompanyDTO(PydanticDTO[CompanySchema]):
    config = DTOConfig(
        max_nested_depth=2,
    )

class CreateCompanyDTO(CompanyDTO):
    config = DTOConfig(
        include={'name'}
    )


CompanySchema.model_rebuild()

