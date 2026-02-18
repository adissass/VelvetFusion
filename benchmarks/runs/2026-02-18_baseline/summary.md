# Baseline Summary

## Run Files

- `run1.json`
- `run2.json`
- `run3.json`

## Extracted Metrics

| Metric | Run 1 | Run 2 | Run 3 | Median |
| --- | --- | --- | --- | --- |
| `/fuse` p95 (ms) | 13.9010 | 11.7444 | 13.0207 | 13.0207 |
| `/persona` p95 (ms) | 13.5329 | 10.9682 | 12.6547 | 12.6547 |
| cold start (s) | 6.10 | - | - | 6.10 |
| error rate (%) | 0.00 | 0.00 | 0.00 | 0.00 |
| persona list item count | 210 | 210 | 210 | 210 |

## Notes

- Observations:
  - All three warm runs completed with 0% request failures.
  - Run-to-run variance is low and within expected local-machine noise.
  - Persona list size remained stable at 210 items.
- Anomalies:
  - None in the final recorded run set.
- Acceptance criteria met? (yes/no): yes
