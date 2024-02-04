from __future__ import annotations

from uuid import UUID
from enum import Enum
from .schema import Schema

from datetime import date


class UserMedicineAssociationSchema(Schema):
    user_id: UUID
    community_id: UUID
    
    dosage: str
    bought_on: date
    expires: date

    total: int
    current_amount: int
