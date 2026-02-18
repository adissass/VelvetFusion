# Benchmarks

This directory contains the performance measurement contract, scripts, and recorded run artifacts.

## Purpose

Provide a reproducible baseline and before/after comparisons for backend performance work in `velvetfusion_roadmap.md`.

## Structure

- `BASELINE_CONTRACT.md`
  - The fixed benchmark rules and run procedure.
- `k6/`
  - k6 scripts and k6-specific notes.
- `runs/`
  - Raw outputs and summaries from each benchmark session.

## Rules

- Do not change benchmark method mid-phase without documenting why.
- Keep raw outputs committed for traceability.
- Compare optimizations against the latest accepted baseline session.
