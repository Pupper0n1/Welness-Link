from __future__ import annotations

from typing import Optional
from uuid import UUID

from litestar.contrib.pydantic import PydanticDTO
from litestar.dto import DTOConfig

from .medicine import MedicineSchema
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

    medicines: list[MedicineSchema] = []





# Define a DTO for user data
class CompanyDTO(PydanticDTO[CompanySchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy='camel',
    )

class CreateCompanyDTO(CompanyDTO):
    config = DTOConfig(
        include={'name'},
        rename_strategy='camel'
    )

class UpdateCompanyDTO(CompanyDTO):
    config = DTOConfig(
        exclude={'id', 'logo', 'medicines'},
        rename_strategy='camel'
    )


CompanySchema.model_rebuild()

