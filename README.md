# AI BUDDY by Millionminds / CAMPUS TaaS

Frontend prototype MVP plus Phase 1 backend foundation for an AI-powered Talent-as-a-Service platform connecting students, startups, and mentors.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- ShadCN-style UI primitives
- Framer Motion
- FastAPI
- PostgreSQL 15 + pgvector
- Redis
- LangGraph-ready agent workflows

## Run Frontend

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run Backend

```bash
docker compose up --build
```

Open `http://localhost:8000/docs`.

Architecture notes live in `docs/CAMPUS_TAAS_ARCHITECTURE.md`.
