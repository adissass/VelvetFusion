# VelvetFusion Baseline Benchmark Contract

This contract defines exactly how baseline measurements are collected for Phase 0.

## 1) Goal

Capture reproducible baseline metrics for:
- `/fuse` latency
- `/persona` list latency (current endpoint)
- backend cold start time

The baseline is the reference for all later performance claims.

## 2) Tooling

- Load tool: `k6`
- Backend target URL: `http://localhost:8080`
- Frontend is not part of load measurement for this baseline.

## 3) Fixed Request Mix

For warm latency runs:
- 70%: persona list requests
- 30%: fusion requests

Endpoint definitions:
- Persona list (current baseline): `GET /api/v1/persona`
- Fusion: `GET /api/v1/persona/fuse?name1=<personaA>&name2=<personaB>`

Note:
- Pagination is planned in Phase 1.
- Until pagination exists, baseline uses the full persona list endpoint.
- After pagination is added, capture a second baseline on `GET /api/v1/persona?page=0&size=50` and clearly label it as post-pagination baseline.

Fusion test pair set must be fixed for all baseline runs and documented in run notes.

## 4) Test Conditions

- Run locally on the same machine.
- Close unnecessary heavy background applications.
- Use the same dataset snapshot for all compared runs.
- Do not run other load tests concurrently.

## 5) Execution Procedure

For each scenario, execute 3 runs and record all raw outputs:

1. Warm latency scenario
   - backend already started and stable
   - collect p95 metrics for `/fuse` and `/personas`
2. Cold start scenario
   - backend fully stopped
   - start backend
   - measure time until service is ready (`/actuator/health` or equivalent health check)

Final reported value:
- median of the 3 run results for each metric

## 6) Metrics To Record

- `/fuse` p95 latency (warm)
- `/persona` p95 latency (warm, current list endpoint)
- persona list response item count (for comparability notes)
- cold start time (seconds)
- request error rate (%)
- total request count and duration

## 7) Output Format and Location

Each benchmark session gets its own folder:

- `benchmarks/runs/<YYYY-MM-DD>_baseline/`

Required files in session folder:
- `environment.md`
  - machine info, OS, Java version, DB state notes
- `run1.json`
- `run2.json`
- `run3.json`
- `summary.md`
  - median values
  - observations
  - anomalies (if any)

## 8) Baseline Acceptance Criteria

A baseline session is accepted only if:
- all 3 runs complete without load tool failure
- error rate is documented
- environment notes are present
- median metrics are explicitly calculated

## 9) Change Control

If contract changes are needed:
- update this file in a dedicated docs commit
- explain why the old method was insufficient
- do not compare old and new method metrics directly without caveat
