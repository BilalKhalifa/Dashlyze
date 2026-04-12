# Dashlyze

AI-powered analytics dashboard for non-technical users.

## Why this project exists
Dashlyze is being built as a **production-style learning project** to master full-stack engineering end-to-end:
- Frontend architecture and UX
- Backend APIs and AI orchestration
- Database modeling and sync strategies
- Professional Git workflow and delivery discipline

---

## Current product scope
1. Users upload CSV/TSV or connect Google Sheets.
2. Data is normalized into one dataset schema.
3. AI generates dashboard configuration JSON.
4. Dashboard renders interactive, draggable, resizable widgets.
5. Data can be refreshed from source (Google Sheets first supports refresh-on-open).

### Canonical data models
```js
// Dataset
{
  columns: [{ name, type }],
  rows: [],
  metadata: { sourceType: "csv" | "google_sheet" }
}

// Widget
{
  id,
  type,
  title,
  layout: { x, y, w, h },
  config: { xField, yField }
}
```

---

## Progress snapshot (as of 2026-04-12)
- ✅ CSV upload + preview flow complete
- ✅ Parsing + column type detection complete
- ⬜ Dashboard rendering not built yet
- ⬜ Backend AI integration not started

---

## Stack (current + recommended)
### Frontend (current)
- React (Vite)
- Tailwind CSS
- Recharts
- PapaParse
- react-grid-layout

### Backend (planned)
- Node.js + Express
- Firestore (Firebase)

### Recommended additions (next)
- **Zod** for API input/output validation
- **TanStack Query** for server state + caching
- **Axios** (or native fetch wrapper) for API client consistency
- **Winston/Pino** for structured backend logging
- **Vitest + React Testing Library + Supertest** for test coverage

---

## Professional architecture direction
- **Source Layer**: connectors (CSV, Google Sheets) normalize input.
- **Analysis Layer**: backend-only AI orchestration (provider-agnostic adapter).
- **Dashboard Layer**: widget renderer and layout engine.
- **Sync Layer**: source refresh jobs and staleness metadata.

---

## Learning-first workflow agreement
- Build in small, reviewable steps.
- Focus on understanding before implementation.
- Prefer explanations + guided implementation over blind copy/paste.
- Use feature branches for daily work; merge to main only when stable.

### Git flow (daily)
1. Create/switch branch.
2. Make one focused change.
3. Commit with meaningful message.
4. Push branch.
5. Open PR and review.
6. Merge to main only after confidence.

---

## Conversation memory log
### Session 4 (2026-04-12)
- Re-established project context for continuation in Codex/Desktop.
- Confirmed learning-first mentoring style and professional engineering direction.
- Confirmed branch-based workflow for daily GitHub contributions.
- Added this README as persistent memory so future sessions can resume quickly.

### Session 5 (2026-04-12)
- README confirmed in-repo and updated directly in branch.
- Added explicit git sync commands below so changes are always visible locally.

---

## Next mentoring step
Define and scaffold a **minimal backend API** (`/health`, `/analyze`, `/datasets/:id/refresh`) with validation and clear folder structure before integrating any AI provider.

## If you don't see latest README changes
Run:

```bash
git checkout work
git pull origin work
```
