# Benchmark Environment

- Date: 2026-02-18
- Session folder: `benchmarks/runs/2026-02-18_baseline`
- Git commit: `aeb34f9`
- Benchmark script: `benchmarks/k6/baseline.js`
- Contract version/file: `benchmarks/BASELINE_CONTRACT.md`

## Machine

- OS: Darwin 24.6.0
- CPU: Apple M2
- RAM: 16 GB (17179869184 bytes)

## Runtime Versions

- Java: openjdk version "24.0.1" 2025-04-15
- Maven: Apache Maven 3.9.10
- PostgreSQL: psql (PostgreSQL) 17.4 (Postgres.app)
- k6: v1.6.1

## Service Configuration

- Backend URL: `http://localhost:8080`
- Frontend running? (yes/no): no
- DB dataset source/version: `backend/src/main/resources/personaData.json` (210 personas)
- VUS: 10
- Duration: 30s
- Think time ms: 200
- Fusion weight: 0.3 (30%)

## Notes

- Any background tasks running: none intentionally
- Any deviations from contract:
  - A preliminary benchmark run was discarded after user requested explicit backend readiness verification first.
  - Final recorded runs (`run1`/`run2`/`run3`) were executed only after readiness checks passed.
