from uuid import UUID

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    service: str


class ParseOnboardingRequest(BaseModel):
    role: str = Field(default="student")
    text: str = Field(min_length=1)
    is_beginner: bool = False
    github_url: str | None = None


class ParseOnboardingResponse(BaseModel):
    collected_data: dict
    missing_keys: list[str]
    next_question: str
    is_complete: bool


class ChatMessage(BaseModel):
    message: str
    is_beginner: bool = False


class ProjectIngestionRequest(BaseModel):
    raw_input: str = Field(min_length=1)
    budget: int
    timeline_weeks: int


class ProjectIngestionResponse(BaseModel):
    proposed_schema: dict
    is_realistic: bool
    message: str


class MatchResult(BaseModel):
    user_id: UUID
    name: str | None
    match_score: float
    profile_data: dict


class MatchResponse(BaseModel):
    project_id: UUID
    leads: list[MatchResult]
    shadows: list[MatchResult]
