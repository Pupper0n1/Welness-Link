# Association.py
from sqlalchemy import Column, ForeignKey, String, UUID, Date, Integer
from sqlalchemy.orm import relationship
from litestar.contrib.sqlalchemy.base import UUIDBase
import enum

from sqlalchemy.schema import UniqueConstraint


class UserMedicineAssociation(UUIDBase):
    __tablename__ = 'user_medicine_association_table'
    user_id = Column(UUID, ForeignKey('user_table.id'))
    medicine_id = Column(UUID, ForeignKey('medicine_table.id'))

    # dosage = Column(String)
    dosage = Column(String)
    bought_on = Column(Date)
    expires = Column(Date)

    total = Column(Integer)
    current_amount = Column(Integer)


    medicine = relationship('Medicine', back_populates='users')
    user = relationship('User', back_populates='medicines')


    __table_args__ = (
        UniqueConstraint('user_id', 'medicine_id'),
    )