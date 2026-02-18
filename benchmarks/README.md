# Benchmarks

This directory contains the performance measurement contract, scripts, and recorded run artifacts.

## Purpose

Provide a reproducible baseline and before/after comparisons for backend performance work in `velvetfusion_roadmap.md`.

## Structure

- `BASELINE_CONTRACT.md`
  - The fixed benchmark rules and run procedure.
- `API_DB_SNAPSHOT.md`
  - Phase 0 snapshot of current API contract and DB schema assumptions.
- `k6/`
  - k6 scripts and k6-specific notes.
- `runs/`
  - Raw outputs and summaries from each benchmark session.

## Rules

- Do not change benchmark method mid-phase without documenting why.
- Keep raw outputs committed for traceability.
- Compare optimizations against the latest accepted baseline session.

## Baseline Run Commands (Phase 0)

Create a session folder:

```bash
mkdir -p benchmarks/runs/<YYYY-MM-DD>_baseline
cp benchmarks/runs/TEMPLATE/environment.md benchmarks/runs/<YYYY-MM-DD>_baseline/environment.md
cp benchmarks/runs/TEMPLATE/summary.md benchmarks/runs/<YYYY-MM-DD>_baseline/summary.md
```

Run three warm-latency captures:

```bash
k6 run --summary-export benchmarks/runs/<YYYY-MM-DD>_baseline/run1.json benchmarks/k6/baseline.js
k6 run --summary-export benchmarks/runs/<YYYY-MM-DD>_baseline/run2.json benchmarks/k6/baseline.js
k6 run --summary-export benchmarks/runs/<YYYY-MM-DD>_baseline/run3.json benchmarks/k6/baseline.js
```

Optional parameterized run:

```bash
BASE_URL=http://localhost:8080 VUS=10 DURATION=30s THINK_TIME_MS=200 FUSION_WEIGHT=0.3 \
k6 run --summary-export benchmarks/runs/<YYYY-MM-DD>_baseline/run1.json benchmarks/k6/baseline.js
```
