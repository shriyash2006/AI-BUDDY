from uuid import UUID

from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.agents.dynamic_interviewer import run_dynamic_interviewer
from app.agents.product_manager import run_product_manager
from app.core.config import get_settings
from app.db.session import get_db
from app.schemas import (
    ChatMessage,
    HealthResponse,
    MatchResponse,
    ParseOnboardingRequest,
    ParseOnboardingResponse,
    ProjectIngestionRequest,
    ProjectIngestionResponse,
)

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="ok", service=get_settings().app_name)


@router.post("/api/onboard/parse", response_model=ParseOnboardingResponse)
async def parse_onboarding(payload: ParseOnboardingRequest) -> ParseOnboardingResponse:
    state = run_dynamic_interviewer(payload.text, payload.is_beginner)
    return ParseOnboardingResponse(
        collected_data=state["collected_data"],
        missing_keys=state["missing_keys"],
        next_question=state["next_question"],
        is_complete=not state["missing_keys"]
    )


@router.websocket("/ws/onboarding/{session_id}")
async def onboarding_socket(websocket: WebSocket, session_id: str) -> None:
    await websocket.accept()
    await websocket.send_json({
        "session_id": session_id,
        "from": "ai",
        "message": "Welcome to CAMPUS TaaS. Tell me about your skills, goals, and availability."
    })

    try:
        while True:
            payload = ChatMessage.model_validate_json(await websocket.receive_text())
            state = run_dynamic_interviewer(payload.message, payload.is_beginner)
            await websocket.send_json({
                "from": "ai",
                "collected_data": state["collected_data"],
                "missing_keys": state["missing_keys"],
                "message": state["next_question"],
                "is_complete": not state["missing_keys"]
            })
    except WebSocketDisconnect:
        return


@router.post("/api/founder/ingest", response_model=ProjectIngestionResponse)
async def founder_ingest(payload: ProjectIngestionRequest) -> ProjectIngestionResponse:
    return run_product_manager(payload.raw_input, payload.budget, payload.timeline_weeks)


@router.get("/api/projects/{project_id}/matches", response_model=MatchResponse)
async def get_project_matches(project_id: UUID, db: AsyncSession = Depends(get_db)) -> MatchResponse:
    lead_query = text(
        """
        SELECT u.id, u.name, u.profile_data,
          1 - (u.semantic_profile <=> p.requirements_embedding) AS match_score
        FROM users u
        CROSS JOIN projects p
        WHERE p.id = :project_id
          AND u.role = 'student'
          AND u.semantic_profile IS NOT NULL
          AND p.requirements_embedding IS NOT NULL
          AND COALESCE((u.profile_data->>'available_hours')::int, 0) >= 8
        ORDER BY u.semantic_profile <=> p.requirements_embedding
        LIMIT 5
        """
    )
    shadow_query = text(
        """
        SELECT u.id, u.name, u.profile_data,
          0.72 AS match_score
        FROM users u
        WHERE u.role = 'student'
          AND u.profile_data ? 'target_learning_path'
        LIMIT 5
        """
    )

    lead_rows = (await db.execute(lead_query, {"project_id": project_id})).mappings().all()
    shadow_rows = (await db.execute(shadow_query)).mappings().all()

    return MatchResponse(
        project_id=project_id,
        leads=[dict(row) for row in lead_rows],
        shadows=[dict(row) for row in shadow_rows]
    )
