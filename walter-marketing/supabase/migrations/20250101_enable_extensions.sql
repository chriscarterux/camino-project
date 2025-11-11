-- Enable required PostgreSQL extensions
-- This should run before other migrations

-- UUID generation functions (install in public schema for compatibility)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

-- Additional useful extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA public;  -- For similarity searches
CREATE EXTENSION IF NOT EXISTS "btree_gin" WITH SCHEMA public; -- For better GIN index performance
