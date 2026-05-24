from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "CAMPUS TaaS API"
    environment: str = "local"
    database_url: str = "postgresql+asyncpg://campus:campus@localhost:5432/campus_taas"
    redis_url: str = "redis://localhost:6379/0"
    openai_api_key: str | None = None
    google_api_key: str | None = None
    embedding_dimensions: int = 1536

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()
