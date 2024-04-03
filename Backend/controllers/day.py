# Import necessary modules and libraries
from crud.day import get_days_list
from litestar import Controller, get, post
from litestar.dto import DTOData
from litestar.exceptions import HTTPException
from models.day import Day
from schemas.day import CreateDayDTO, DayDTO, DaySchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7


class DayController(Controller):
    path = "/day"
    return_dto = DayDTO

    @get("/", exclude_from_auth=True)
    async def get_days(self, session: AsyncSession) -> list[DaySchema]:
        days = await get_days_list(session)
        return days

    @post("/", dto=CreateDayDTO)
    async def create_day(
        self, session: AsyncSession, data: DTOData[DaySchema]
    ) -> DaySchema:
        day_data = data.create_instance(id=uuid7())
        validated_day_data = DaySchema.model_validate(day_data)
        day = Day(**validated_day_data.__dict__)
        session.add(day)

        await session.commit()
        return validated_day_data

    @get("/{day_name:str}", exclude_from_auth=True)
    async def get_day_by_name(self, session: AsyncSession, day_name: str) -> DaySchema:
        query = select(Day).where(Day.day == day_name)
        result = await session.execute(query)
        day = result.scalar_one_or_none()
        if day is None:
            raise HTTPException(404, "Day not found")
        return day

    @post("/initialize", dto=CreateDayDTO)
    async def initialize_days(self, session: AsyncSession) -> str:
        days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ]

        for day in days:
            session.add(Day(id=uuid7(), day=day))

        await session.commit()
        return "Initialized days"
