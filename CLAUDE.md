# CLAUDE.md — Dashlyze Project Memory
> This file is owned by Claude. Update it after every session. Use it at the start of every conversation to restore context fast.

---

## 1. Project Identity

| Key | Value |
|-----|-------|
| Name | Dashlyze |
| Type | React Analytics Dashboard (Full-Stack) |
| Root | `D:\React\Dashlyze` |
| Frontend | `D:\React\Dashlyze\client` — Vite + React |
| Backend | `D:\React\Dashlyze\server` — Node.js + Express |
| Repo | Public GitHub repo (every commit counts for profile) |

---

## 2. Tech Stack

### Frontend (client/)
- React 18 + Vite
- React Router v6 (route-based navigation, no state-based page switching)
- Tailwind CSS (utility-first, CSS variables for theming)
- Lucide React (icons)
- PapaParse (CSV parsing)
- react-icons (used in DataImportFromSheets — RiLinksLine)

### Backend (server/)
- Node.js + Express 5
- CORS enabled (origin: `http://localhost:3000` or `CLIENT_URL` env)
- dotenv for env management
- Zod (installed, not yet used for validation)
- nodemon for dev

---

## 3. Project Structure (Key Files)

```
Dashlyze/
├── CLAUDE.md                          ← THIS FILE (Claude's memory)
├── PROJECT_CONTEXT.md                 ← Root-level human-readable context
├── client/
│   └── src/
│       ├── App.jsx                    ← Renders <AppLayout />
│       ├── layouts/
│       │   └── AppLayout.jsx          ← Sidebar + Header + AppRoutes layout
│       ├── components/
│       │   ├── Header.jsx             ← Logo + React Router Link to /dashboard
│       │   ├── Sidebar.jsx            ← NavLink-based sidebar, collapsible
│       │   ├── Main.jsx               ← (exists, likely unused)
│       │   ├── common/
│       │   │   ├── DataImport.jsx     ← CSV drag/drop upload component (has progress state)
│       │   │   └── DataImportFromSheets.jsx ← Google Sheets URL input (partial, no fetch yet)
│       │   ├── import/
│       │   │   ├── FileDropzone.jsx   ← CLEARED (comment only, to be rebuilt or removed)
│       │   │   ├── DataPreviewTable.jsx ← Table UI for showing parsed CSV data (complete)
│       │   │   └── AnalysisTypeSelector.jsx ← CLEARED (comment only, to be rebuilt later)
│       │   └── ui/                    ← (directory exists, check contents when needed)
│       ├── pages/
│       │   ├── DataImport.jsx         ← PAGE — NEARLY EMPTY (just returns "DataImport" text)
│       │   ├── Dashboard.jsx          ← (exists, content unknown)
│       │   ├── Analytics.jsx          ← (exists, content unknown)
│       │   ├── Reports.jsx            ← (exists, content unknown)
│       │   └── Settings.jsx           ← (exists, content unknown)
│       ├── routes/
│       │   ├── path.js                ← PATHS constants
│       │   ├── routesConfig.jsx       ← ROUTES array (path, label, icon, element, children)
│       │   └── AppRoutes.jsx          ← (exists, renders routes)
│       └── lib/
│           ├── api.js                 ← analyzeDataset() → POST http://localhost:4000/analyze
│           └── csvParser.js           ← parseCSV(), detectColumnTypes(), formatFileSize(), isSupportedFile()
└── server/
    └── src/
        ├── app.js                     ← Express app setup, CORS, routes mounted
        ├── server.js                  ← Entry point, listens on PORT 4000
        ├── routes/
        │   ├── health.routes.js       ← GET /health
        │   └── analyze.routes.js      ← POST /analyze
        ├── controllers/
        │   ├── health.controller.js   ← (basic health check)
        │   └── analyze.controller.js  ← MOCK: validates dataset, returns hardcoded bar_chart widget
        └── middlewares/
            └── error.middleware.js    ← Global error handler
```

---

## 4. Route Map

| Path | Component | Notes |
|------|-----------|-------|
| `/` | Dashboard | Root |
| `/dashboard` | Dashboard | |
| `/analytics` | Analytics | |
| `/reports` | Reports | Has children: monthly, quarterly, annual |
| `/reports/monthly` | div placeholder | |
| `/reports/quarterly` | div placeholder | |
| `/reports/annual` | div placeholder | |
| `/data-import` | DataImport | PAGE IS EMPTY — needs full build |

---

## 5. Backend API

| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/health` | ✅ Working | Basic health check |
| POST | `/analyze` | ⚠️ Mock | Returns hardcoded bar_chart widget. Real AI analysis NOT yet wired |

**analyze.controller.js mock response shape:**
```json
{
  "message": "Mock Analysis Complete",
  "widget": {
    "id": "w1",
    "type": "bar_chart",
    "title": "Sample Bar Chart",
    "layout": { "x": 0, "y": 0, "w": 6, "h": 4 },
    "config": { "xField": "col0name", "yField": "col1name" }
  }
}
```

**Frontend API call:** `client/src/lib/api.js → analyzeDataset(dataset)` → POST to `http://localhost:4000/analyze`

---

## 6. DataImport Page — Current State & What Needs Building

### What EXISTS (components ready to use):
- `components/common/DataImport.jsx` — Full CSV drag/drop upload with:
  - `status` state: `"idle" | "reading" | "parsing" | "success" | "error"`
  - `progress` state (0–100)
  - `isParsing` boolean
  - `selectedFile` state
  - Calls `parseCSV()` from csvParser.js
  - Has `sleep()` for staged progress simulation
  - Passes `dataset` up via `setDataset` prop
  - **CURRENTLY shows only the dropzone — no success/progress UI rendered yet**
- `components/common/DataImportFromSheets.jsx` — Google Sheets URL input (partial, no fetch/parse logic yet)
- `components/import/DataPreviewTable.jsx` — Full table UI for showing parsed data (columns, rows, metadata bar, download, reset) — COMPLETE
- `lib/csvParser.js` — Full parser with type detection — COMPLETE
- `lib/api.js` — `analyzeDataset()` ready — COMPLETE

### What is MISSING / NEEDS BUILDING:
1. **`pages/DataImport.jsx`** — Orchestration page needs to:
   - Tab switcher: "CSV Upload" | "Google Sheets"
   - Render `DataImport.jsx` (CSV) or `DataImportFromSheets.jsx` (Sheets) based on tab
   - Manage shared `dataset`, `error`, `activeTab` state
   - Show `DataPreviewTable` when dataset is ready
   - Show "Build Dashboard with AI" button (calls `analyzeDataset()`)
   - Show file info row below dropzone when file is selected

2. **Upload Success UI (Green Tick)** — After file upload succeeds in `DataImport.jsx` (common), show:
   - Green checkmark circle icon
   - File name + "Ready for analysis" text
   - File info row (filename, size, "Ready" badge in green)
   - "Remove File" link to reset

3. **Upload Progress Indicator** — While parsing, show inside the dropzone:
   - Animated progress bar or spinner
   - Status text: "Reading file…" → "Parsing data…" → complete

4. **Google Sheets connect flow** — `DataImportFromSheets.jsx` needs:
   - Connect Sheet button with handler
   - Extract sheet ID from URL, fetch CSV export
   - Parse with PapaParse, call setDataset
   - "Connected successfully" green status banner
   - Data preview after connect

---

## 7. Design System

| Token | Value |
|-------|-------|
| `--bg-base` | Dark base background |
| `--bg-surface` | Surface panels |
| `--bg-hover` | Hover state |
| `--accent` | `#7c3aed` (violet) |
| `--accent-glow` | `#9f5cff` (lighter violet) |
| `--accent-muted` | Muted violet for submenu active |
| `--border` | `rgba(159,92,255,0.3)` |
| `--text-primary` | White / near-white |
| `--text-secondary` | Muted violet-white |

Key UI patterns:
- `rounded-2xl` / `rounded-[32px]` for cards/dropzones
- `border border-dashed border-violet-300/40` for dropzones
- `bg-[#3b1870]/30` for dropzone fill
- `shadow-[0_0_32px_rgba(139,92,246,0.14)]` for glow
- Active nav: `bg-[var(--accent)] shadow-[0_0_20px_rgba(124,58,237,0.4)]`
- CTA button: `bg-gradient-to-r from-[#7c3aed] to-[#9f5cff]`
- Success green: `#22c55e` or Tailwind `green-500`

---

## 8. Commit Convention

Format: `type(scope): message`

Types: `feat` | `fix` | `style` | `refactor` | `chore` | `docs`

Examples:
- `feat(data-import): add CSV upload success state with green tick`
- `feat(data-import): add progress indicator during file parsing`
- `fix(sheets): wire Google Sheets CSV fetch and parse`
- `feat(backend): replace mock analyze with real AI prompt`
- `docs: add CLAUDE.md project memory file`

---

## 9. What To Do Next (Priority Order)

### 🔴 Frontend — DataImport Page (IMMEDIATE)
1. Build `pages/DataImport.jsx` — tabs, state orchestration, component assembly
2. Add upload success UI in `components/common/DataImport.jsx` — green tick, file info row, "Remove File"
3. Add progress indicator UI — progress bar + status label during parsing stages
4. Wire Google Sheets fetch in `DataImportFromSheets.jsx`

### 🟡 Backend — Real Analysis
5. Add Zod validation to `/analyze` request body (already installed)
6. Replace mock `analyze.controller.js` with real Claude API call
7. Add `/sheets` proxy route to fetch Google Sheets CSV server-side (avoids client CORS issues)
8. Consider multer for direct file upload (optional — currently frontend parses CSV itself)

### 🟢 Other Pages
9. Build out `Dashboard.jsx` — wire to analyzed widget data
10. Build out `Analytics.jsx`
11. Build out `Reports.jsx` sub-pages (monthly, quarterly, annual)

---

## 10. Session Log

| Session | What Was Done |
|---------|---------------|
| Early sessions | Set up React + Vite, routing, sidebar, header, AppLayout |
| Mid sessions | Built csvParser.js, api.js, DataImport/Sheets components, DataPreviewTable |
| Backend session | Set up Express server, health + analyze routes, mock controller |
| Refactor session | Cleared FileDropzone.jsx and AnalysisTypeSelector.jsx for rebuild; DataImport page.jsx left empty |
| This session | Full codebase map, created CLAUDE.md, planned DataImport page build |

---

## 11. Running The Project

```bash
# Frontend
cd client && npm run dev        # http://localhost:5173

# Backend  
cd server && npm run dev        # http://localhost:4000
```

Env: `server/.env` (actual keys — not committed). `server/.env.example` is committed.
