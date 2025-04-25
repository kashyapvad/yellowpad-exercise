from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    openai_api_key: str = os.getenv('OPENAI_API_KEY', '')
    allowed_origins: List[str] = ['*']  # In production, restrict this!

    class Config:
        env_file = 'backend/.env'
        env_file_encoding = 'utf-8'

def get_settings():
    return Settings()

# Core configuration (CORS, environment variables, etc.) will go here. 