from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
from backend.app.routers.contract import router as contract_router
from backend.app.core.config import get_settings

app = FastAPI()
settings = get_settings()

# Log the loaded OpenAI API key (masked)
print(f"Loaded OpenAI API key: {settings.openai_api_key[:8]}..." if settings.openai_api_key else "OpenAI API key not loaded!")

# CORS support
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set OpenAI API key
openai.api_key = settings.openai_api_key

@app.get("/")
def root():
    return {"status": "ok"}

# Register contract router
app.include_router(contract_router) 