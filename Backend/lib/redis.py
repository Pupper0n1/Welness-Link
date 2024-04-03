import os

from dotenv import load_dotenv
from redis.asyncio import Redis

load_dotenv()

__all__ = ["redis"]

redis = Redis.from_url(os.getenv("REDIS_URL"))
