from __future__ import annotations

from litestar.contrib.pydantic import PydanticDTO
from litestar.dto import DTOConfig

from .schema import Schema


class DaySchema(Schema):
    day: str


class DayDTO(PydanticDTO[DaySchema]):
    config = DTOConfig(
        max_nested_depth=2,
        rename_strategy="camel",
    )


class CreateDayDTO(DayDTO):
    config = DTOConfig(
        include={"day"},
        rename_strategy="camel",
    )


DaySchema.model_rebuild()
