# VelvetFusion

Persona fusion calculator with a Next.js frontend and a Spring Boot + PostgreSQL backend.

## Repository Layout

```text
.
├── backend/                  # Spring Boot API
├── benchmarks/               # Phase 0 benchmark contract + run artifacts
├── frontend/                 # Next.js app (UI)
└── script/                   # Utility scripts
```

## Current Architecture

```mermaid
flowchart LR
  U[User Browser]
  FE[Next.js Frontend\nfrontend/]
  API[Spring Boot API\nbackend/]
  SVC[FusionCalculatorService]
  REPO[PersonaRepository]
  DB[(PostgreSQL)]
  FC[(fusionChart.json)]

  U --> FE
  FE -->|HTTP /api/v1/persona*| API
  API --> SVC
  API --> REPO
  SVC --> REPO
  REPO --> DB
  SVC --> FC
```

## Backend Layer Flow

Current request flow is intentionally simple:

1. `PersonaController` receives request (`/api/v1/persona`, `/fuse`, `/{name}`).
2. `FusionCalculatorService` handles fusion rule logic.
3. `PersonaRepository` handles DB reads via Spring Data JPA.
4. Fusion chart rules are loaded from `backend/src/main/resources/fusionChart.json`.

This maps to:

- Controller: `backend/src/main/java/com/velvetfusion/velvetfusion_api/controller/PersonaController.java`
- Service: `backend/src/main/java/com/velvetfusion/velvetfusion_api/service/FusionCalculatorService.java`
- Repository: `backend/src/main/java/com/velvetfusion/velvetfusion_api/repository/PersonaRepository.java`

## Tech Stack

### Frontend
- Next.js 15
- React 19
- Tailwind CSS 4
- Radix UI-based component primitives

### Backend
- Java 21
- Spring Boot 3.5
- Spring Web
- Spring Data JPA
- Flyway (schema migrations)
- PostgreSQL

### Tooling
- Maven wrapper (`backend/mvnw`)
- npm + package-lock (`frontend/package-lock.json`)
- k6 benchmark contract under `benchmarks/`

## Current API Surface

Base paths: `/api/v1/persona`, `/api/v1/health`

- `GET /api/v1/persona?page=0&size=50` -> paginated persona list
  - response shape: `{ items, page, size, totalItems, totalPages, hasNext, hasPrevious }`
- `GET /api/v1/persona/{name}` -> fetch persona by exact name
- `GET /api/v1/persona/fuse?name1=A&name2=B` -> fusion result
- `GET /api/v1/health` -> service/db health status (`UP` or `DOWN`)

Error contract:
- canonical JSON error shape via global exception handling
- status/code/message/path fields are stable across handled error types

Request tracing:
- each response includes `X-Request-Id`
- backend logs include request start/end with `requestId`, status, and duration

## Local Development (Current)

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

Notes:
- Flyway migrations run on startup.
- Existing local schema is baselined and migrated automatically.

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Expected local endpoints:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

Frontend API base is currently set through:
- `frontend/.env.local` -> `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1/`

## Phase 0 Baseline Assets

Benchmark baseline contract and artifact layout:
- `benchmarks/BASELINE_CONTRACT.md`
- `benchmarks/README.md`

## Phase 1 Status (Local)

Completed locally:
- DTO-based API responses (no entity leakage)
- global error contract
- request validation
- paginated persona endpoint
- Flyway baseline migration setup
- integration tests for fuse/error/pagination/health
- structured request logging with `requestId`
- pre-deploy quality gate verification
