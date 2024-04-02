from collections.abc import AsyncGenerator
from dotenv import load_dotenv
import os
from litestar.config.cors import CORSConfig

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from litestar import Litestar
from litestar.contrib.sqlalchemy.plugins import SQLAlchemyAsyncConfig, SQLAlchemyPlugin
from litestar.contrib.sqlalchemy.plugins import SQLAlchemyAsyncConfig
from litestar.contrib.sqlalchemy.base import UUIDAuditBase, UUIDBase
from litestar.exceptions import ClientException
from litestar.status_codes import HTTP_409_CONFLICT
from litestar.static_files.config import StaticFilesConfig

from controllers.auth import oauth2_auth, login_handler, logout_handler
from controllers.user import UserController
from controllers.company import CompanyController
from controllers.medicine import MedicineController
from controllers.doctor import DoctorController
from controllers.day import DayController

from models.base import Base

from lib.seed import seed_data

from lib import (
    openapi,
    cache
)

from litestar.stores.registry import StoreRegistry

load_dotenv()



# This function is used to provide a transactional session to the endpoints
async def provide_transaction(db_session: AsyncSession) -> AsyncGenerator[AsyncSession, None]:
    try:
        async with db_session.begin():  # Begin a transaction
            yield db_session
    except IntegrityError as exc:  # Catch any integrity errors from the database
        # Raise a client exception if an integrity error occurs
        raise ClientException(
            status_code=HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc




# Function that will run on app startup
async def on_startup() -> None:
    """Initializes the database."""
    async with db_config.get_engine().begin() as conn:
        # Drop and recreate tables (remove this line if persistence is needed)

        await conn.run_sync(Base.metadata.drop_all)        
        await conn.run_sync(UUIDBase.metadata.drop_all)
        await conn.run_sync(UUIDAuditBase.metadata.drop_all)

        await conn.run_sync(Base.metadata.create_all)
        await conn.run_sync(UUIDBase.metadata.create_all)
        await conn.run_sync(UUIDAuditBase.metadata.create_all)

    async with db_config.get_session() as session:
        await seed_data(session)
        await session.commit()







# Database configuration using environment variables
db_config = SQLAlchemyAsyncConfig(
    connection_string=os.getenv('DB_URL'))




cors_config = CORSConfig(allow_origins=["*"]) # NOTE: Change it for production

# Create the Litestar application instance
app = Litestar(
    [UserController, MedicineController, CompanyController, DoctorController, DayController, login_handler, logout_handler],  # List of endpoint functions
    dependencies={"session": provide_transaction},  # Dependency to inject session into endpoints
    plugins=[SQLAlchemyPlugin(db_config)],  # Plugin for SQLAlchemy support
    stores=StoreRegistry(default_factory=cache.redis_store_factory),
    openapi_config=openapi.config, # OpenAPI configuration for Swagger UI
    on_startup=[on_startup],  # Startup event handler to initialize DB tables
    on_app_init=[oauth2_auth.on_app_init],  # Startup event handler to initialize OAuth2
    cors_config=cors_config, # CORS configuration
    static_files_config=[   # Static files configuration for user and post images
        StaticFilesConfig(directories=['static/images/users'], path='/user/image'),
        StaticFilesConfig(directories=['static/images/doctors'], path='/doctor/image'),
        StaticFilesConfig(directories=['static/images/medicines'], path='/medicine/image'),
        StaticFilesConfig(directories=['static/images/companies'], path='/company/image'),
    ]
)