# Import necessary modules and libraries
import datetime
from typing import Any

from crud.symptom import get_symptom_by_id, get_symptom_list
from litestar import Controller, Request, get, post
from litestar.contrib.jwt import Token
from litestar.dto import DTOData
from models.user import User
from models.user_symptom import UserSymptom
from schemas.symptom import SymptomDTO, SymptomSchema
from schemas.user_symptom import AddUserSymptomDTO, UserSymptomSchema
from sqlalchemy.ext.asyncio import AsyncSession


class SymptomController(Controller):
    path = "/symptom"
    return_dto = SymptomDTO

    @get("/", exclude_from_auth=True)
    async def get_symptoms(
        self,
        request: "Request[User, Token, Any]",
        session: AsyncSession,
        limit: int = 100,
        offset: int = 0,
    ) -> list[SymptomSchema]:
        user = await get_symptom_list(session, limit, offset)
        return user

    @post("/", dto=AddUserSymptomDTO)
    async def add_symptom(
        self,
        session: AsyncSession,
        request: "Request[User, Token, Any]",
        data: DTOData[UserSymptomSchema],
    ) -> str:
        symptom = await get_symptom_by_id(session, data.as_builtins()["symptom_id"])

        user_symptom = UserSymptom(
            user_id=request.user,
            symptom_id=symptom.id,
            symptom_name=symptom.name,
            date=datetime.datetime.now(),
            intensity=data.as_builtins()["intensity"],
            notes=data.as_builtins()["notes"],
        )

        session.add(user_symptom)
        await session.commit()

        return "Added symptom"
