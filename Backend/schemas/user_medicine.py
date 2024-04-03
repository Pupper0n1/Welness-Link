from __future__ import annotations

from typing import Optional
from uuid import UUID
from enum import Enum
from .schema import Schema

from datetime import date
from .day import DaySchema

from litestar.dto import DTOConfig
from litestar.contrib.pydantic import PydanticDTO


class UserMedicineAssociationSchema(Schema):
    user_id: UUID
    medicine_id: UUID
    medicine_name: str
    
    dosage: str
    bought_on: date
    expires: date

    total: int
    current_amount: int

    days: list[DaySchema] = []



class UserMedicineAssociationDTO(PydanticDTO[UserMedicineAssociationSchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy='camel',
    )

class AddUserMedicineAssociationDTO(UserMedicineAssociationDTO):
    config = DTOConfig(include={'medicine_id', 'dosage', 'expires', 'total', 'days.0.day'},
                       rename_strategy='camel')
