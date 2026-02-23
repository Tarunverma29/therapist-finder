from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "TherapistFinder"
    environment: str = "dev"
    debug: bool = True

    database_url: str

    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


settings = Settings()  # type: ignore[arg-type]

