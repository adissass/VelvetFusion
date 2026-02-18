# k6 Benchmark Notes

This folder contains k6 scripts used by the baseline contract.

Implemented files:
- `baseline.js` for the fixed Phase 0 request mix (70% list / 30% fusion)

Expected environment variables:
- `BASE_URL` (default: `http://localhost:8080`)
- `VUS` (default: `10`)
- `DURATION` (default: `30s`)
- `THINK_TIME_MS` (default: `200`)
- `FUSION_WEIGHT` (default: `0.3`)

Example run:

```bash
k6 run \
  --summary-export benchmarks/runs/<YYYY-MM-DD>_baseline/run1.json \
  benchmarks/k6/baseline.js
```
