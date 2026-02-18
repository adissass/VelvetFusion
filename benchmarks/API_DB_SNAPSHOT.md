# API and DB Snapshot (Phase 0 Baseline)

Snapshot date: 2026-02-18  
Scope: current implemented backend contract and schema assumptions for baseline comparison.

## 1) API Snapshot

Base path: `/api/v1/persona`

### `GET /api/v1/persona`
- Behavior: returns all personas from DB.
- Current implementation: `personaRepository.findAll()`.
- Response shape: array of Persona objects.

Example item shape:

```json
{
  "id": 1,
  "name": "Arsene",
  "arcana": "Fool",
  "level": 1
}
```

### `GET /api/v1/persona/{name}`
- Behavior: returns one persona by exact name match.
- Lookup: `findByName(name)` (case/punctuation sensitive).
- On miss: throws `PersonaNotFoundException`.

### `GET /api/v1/persona/fuse?name1=A&name2=B`
- Behavior: returns a fused persona result.
- Inputs: required query params `name1`, `name2`.
- Fusion rule:
  - result arcana from `fusionChart.json`
  - target level `(level1 + level2) / 2 + 1`
  - first persona where arcana matches and `level >= targetLevel`
- On invalid pair/missing result: throws `InvalidFusionException`.

## 2) Error Contract Snapshot

Current state:
- No global `@ControllerAdvice` error mapping.
- Error response format is not yet standardized.
- This is a known baseline limitation and will change in Phase 1.

## 3) CORS Snapshot

Current allowed origin:
- `http://localhost:3000`

Defined in:
- `@CrossOrigin` on `PersonaController`
- `WebConfig#addCorsMappings`

## 4) DB Schema Snapshot (As Implemented in Code)

Datasource:
- `jdbc:postgresql://localhost:5432/velvetfusion`
- user `postgres`

JPA entity mapping:
- Table: `persona`
- Fields:
  - `id` (identity PK)
  - `name` (string)
  - `arcana` (string)
  - `level` (int)

JPA setting:
- `spring.jpa.hibernate.ddl-auto=none`
- Meaning: schema must already exist; app does not auto-create/update tables.

Repository query capabilities in use:
- exact name lookup
- arcana + minimum level lookup ordered ascending (fusion selection)

## 5) Data Snapshot

Resource data counts:
- `personaData.json`: 210 personas
- unique arcanas in persona data: 21
- `fusionChart.json` top-level rows: 20 (triangular matrix format)

Note:
- Persona list endpoint is currently unpaged.
- Phase 1 plans to add pagination and stable page response shape.

## 6) Known Baseline Caveats

- Import script currently inserts into `personaDTO` table, while JPA entity maps to `persona`.
- API currently returns entities directly (no response DTO boundary).
- Exception responses are not yet normalized.

These caveats are intentionally documented as baseline state for roadmap-driven hardening work.
