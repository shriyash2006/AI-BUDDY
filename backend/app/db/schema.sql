CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'startup', 'mentor', 'admin')),
  email TEXT UNIQUE,
  name TEXT,
  profile_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  semantic_profile VECTOR(1536),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  requirements_schema JSONB NOT NULL DEFAULT '{}'::jsonb,
  requirements_embedding VECTOR(1536),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS squads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES users(id) ON DELETE SET NULL,
  shadow_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'forming',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  deliverable_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'pending_mentor', 'approved', 'rejected')),
  submission_url TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);
CREATE INDEX IF NOT EXISTS users_profile_jsonb_idx ON users USING GIN (profile_data);
CREATE INDEX IF NOT EXISTS projects_requirements_jsonb_idx ON projects USING GIN (requirements_schema);
CREATE INDEX IF NOT EXISTS users_semantic_profile_idx
  ON users USING ivfflat (semantic_profile vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS projects_requirements_embedding_idx
  ON projects USING ivfflat (requirements_embedding vector_cosine_ops) WITH (lists = 100);
