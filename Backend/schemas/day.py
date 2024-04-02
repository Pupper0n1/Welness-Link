from __future__ import annotations

from uuid import UUID
from enum import Enum
from .schema import Schema

from datetime import date

from litestar.dto import DTOConfig
from litestar.contrib.pydantic import PydanticDTO

class DaySchema(Schema):
    day: str





class DayDTO(PydanticDTO[DaySchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy='camel',
    )

class CreateDayDTO(DayDTO):
    config = DTOConfig(
        include={'day'},
        rename_strategy='camel',
    )


DaySchema.model_rebuild()

