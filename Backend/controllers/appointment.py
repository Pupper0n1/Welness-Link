import datetime
from typing import Any

import argon2
import pytz
from schemas.user_symptom import UserSymptomDTO, UserSymptomSchema
from controllers.auth import oauth2_auth
from crud.user import get_user_by_id, get_user_list
from crud.medicine import get_user_medicines_today
from lib.redis import redis
from litestar import Controller, Request, Response, delete, get, patch, post
from litestar.contrib.jwt import OAuth2Login, Token
from litestar.dto import DTOData
from litestar.exceptions import HTTPException
from models.appointment import Appointment
from models.user import User
from schemas.appointment import AppointmentDTO, AppointmentSchema, CreateAppointmentDTO
from schemas.user import CreateUserDTO, UserOutDTO, UserSchema
from sqlalchemy.ext.asyncio import AsyncSession
from uuid_extensions import uuid7

from crud.appointment import delete_appointment_by_id, get_appointment_list_by_doctor_and_day
from crud.doctor import get_doctor_by_id
from datetime import date, datetime, time


class AppointmentController(Controller):
    path = "/appointment"
    return_dto = AppointmentDTO

    @post("/", dto=CreateAppointmentDTO,)
    async def add_appointment(
        self,
        request: "Request[User, Token, Any]",
        session: AsyncSession,
        data: DTOData[AppointmentSchema],
    ) -> str:
        user = await get_user_by_id(session, request.user)
        appointment = data.create_instance(id=uuid7(), user_id=request.user)
        validated_appointment = AppointmentSchema.model_validate(appointment)

        user.appointments.append(Appointment(**validated_appointment.__dict__))

        return "Added Appointment"
    

    @delete("/{appointment_id:str}")
    async def delete_appointment(
        self,
        request: "Request[User, Token, Any]",
        session: AsyncSession,
        appointment_id: str,
    ) -> None:
        await delete_appointment_by_id(session, appointment_id)
        await session.commit()


    @get('/{doctor_id:str}', exclude_from_auth = True)
    async def get_appointment_by_doctor_id(self, request: "Request[User, Token, Any]", session: AsyncSession, doctor_id: str, day: date) -> list[datetime]:
        appointments = await get_appointment_list_by_doctor_and_day(session, doctor_id, day)
        return [appointment.date.time() for appointment in appointments]
