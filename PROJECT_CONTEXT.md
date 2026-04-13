# Dashlyze Project Context

This file is the root-level project memory for the split full-stack setup.

## Structure

- `client/` contains the Vite + React frontend
- `server/` contains the Express API
- the repo root is the coordination layer for documentation and workspace scripts

## Current Baseline

- frontend runs from `client/`
- backend runs from `server/`
- backend health route is available at `GET /health`
- backend analyze route is available at `POST /analyze`
- the current analyze route returns a mock widget response for a valid dataset

## Working Agreement

- keep frontend work inside `client/`
- keep backend work inside `server/`
- update root docs when repo-level workflow changes
- prefer small commits that separate structure work from feature work

## Immediate Next Steps

1. Cleanly commit the split repo structure.
2. Wire the frontend import flow to the backend `/analyze` route.
3. Add validation and better response shaping to the backend.
4. Replace mock analysis with real analysis generation later.
