CREATE TABLE IF NOT EXISTS persona (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    arcana VARCHAR(255) NOT NULL,
    level INTEGER NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_persona_name ON persona (name);
CREATE INDEX IF NOT EXISTS ix_persona_arcana_level ON persona (arcana, level);
