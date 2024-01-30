from __future__ import annotations

from typing import TYPE_CHECKING, Optional
import argon2
from uuid import UUID

from litestar.dto import DTOConfig
from litestar.contrib.pydantic import PydanticDTO
# Initialize Argon2 for password hashing
ph = argon2.PasswordHasher()
from datetime import datetime
from .schema import Schema



class UserSchema(Schema):
    id: UUID
    username: str
    first_name: str
    last_name: str
    email: str
    profile_picture: Optional[str] = None
    password: str
    created_at: datetime
    updated_at: datetime

    

    def set_password(self, str_password):
        self.password = ph.hash(str_password)

    def check_password(self, password):
        try:
            return ph.verify(self.password, password)
        except argon2.exceptions.VerifyMismatchError:
            return False


# Define a DTO for user data
class UserDTO(PydanticDTO[UserSchema]):
    config = DTOConfig(
        max_nested_depth=2,
    )

class UserLoginDTO(UserDTO):
    config = DTOConfig(include={'username', 'password'})

class CreateUserDTO(UserDTO):
    config = DTOConfig(include={'username', 'first_name', 'last_name', 'email', 'password'})

class UserOutDTO(UserDTO):
    config = DTOConfig(
        exclude = {'password'},
        max_nested_depth=2,
    )


UserSchema.model_rebuild()

