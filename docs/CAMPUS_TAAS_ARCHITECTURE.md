# CAMPUS TaaS Architecture

This repository now contains a Phase 1 foundation for the CAMPUS TaaS system.

## Current Scope

- Next.js frontend prototype remains the presentation layer.
- FastAPI backend scaffold provides REST and WebSocket entry points.
- PostgreSQL + pgvector schema supports users, projects, squads, and milestones.
- Redis is included for future chat state, queues, and LangGraph checkpointing.
- LangGraph-style dynamic interviewer is implemented as a text-only Phase 1 workflow.
- Founder ingestion has a deterministic AI Product Manager placeholder.

## Target AI Workflows

### Dynamic Interviewer

State:

- `target_schema`
- `collected_data`
- `chat_history`
- `missing_keys`
- `is_beginner`

Phase 1 supports text input and mock extraction. Later phases should replace the deterministic extractor with Gemini/GPT-4o structured output and add PDF, GitHub, video, and audio parsing.

### AI Product Manager

State:

- `raw_input`
- `proposed_schema`
- `budget`
- `timeline_weeks`
- `is_realistic`

Phase 1 produces a scoped project schema and realism message. Later phases should add Whisper transcription, Notion/GitHub ingestion, and human-in-the-loop negotiation.

## Matching

Lead matching uses strict semantic distance:

```sql
ORDER BY users.semantic_profile <=> projects.requirements_embedding
```

Shadow matching is aspirational and should use beginner `profile_data->'target_learning_path'` once learning-path embeddings are persisted.

## Local Development

Frontend:

```bash
npm install
npm run dev
```

Backend with Docker:

```bash
docker compose up --build
```

Backend without Docker:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs:

```text
http://localhost:8000/docs
```
