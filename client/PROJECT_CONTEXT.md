# Dashlyze — Project Context

> This file is the living memory of the project.
> Read it at the start of every new chat thread to get fully up to speed.
> Update it at the end of every session.

---

## Project Info

| | |
|---|---|
| **Name** | Dashlyze |
| **Type** | AI-powered React analytics dashboard |
| **Repo** | [github.com/BilalKhalifa/Dashlyze](https://github.com/BilalKhalifa/Dashlyze) |
| **Stack** | React 19 · Vite 7 · Tailwind CSS v4 · Firebase · Recharts · PapaParse · Lucide React |

---

## Core MVP Concept

1. User drags & drops a CSV / TSV file
2. User selects analysis type — Trends, Comparison, Distribution, Summary, or AI Auto
3. Clicks **"Analyze with AI"** → Claude API reads the data → returns a dashboard config JSON
4. App renders a fully interactive dashboard from that config using Recharts widgets
5. User can **resize** and **reorder** cards (react-grid-layout), edit titles, change chart types

---

## Tech Decisions (Locked)

| Decision | Choice | Reason |
|---|---|---|
| AI backend | Claude API (Anthropic) | Best for structured JSON output |
| Database | Firebase (Firestore) | Already installed, free tier |
| Charts | Recharts | Already installed |
| Grid layout | react-grid-layout | Industry standard for resizable dashboards |
| Animations | framer-motion | To be installed |
| API key storage | `.env` file (Vite) | `VITE_CLAUDE_API_KEY` — never commit this file |

---

## Folder Structure

```
src/
├── Components/
│   ├── Header.jsx                    ✅ logo, hamburger toggle, brand
│   ├── Sidebar.jsx                   ✅ nav items, collapsible
│   ├── Main.jsx                      ✅ page router
│   └── import/
│       ├── FileDropzone.jsx          ✅ drag-drop, validation, spinner
│       ├── DataPreviewTable.jsx      ✅ first 8 rows, type badges
│       └── AnalysisTypeSelector.jsx  ✅ 5 cards, multi-select, AI auto
├── Pages/
│   ├── Dashboard.jsx                 ⬜ placeholder
│   ├── Analytics.jsx                 ⬜ placeholder
│   ├── DataImport.jsx                ✅ 3-step flow: Drop → Preview → Analyzing
│   ├── Reports.jsx                   ⬜ placeholder
│   └── Settings.jsx                  ⬜ placeholder
├── lib/
│   └── csvParser.js                  ✅ PapaParse wrapper, column type detection
├── Style/
│   └── App.css                       ✅ full design system + import page styles
└── App.jsx                           ✅ app shell, sidebar + header state
```

---

## Design System

**Colors (CSS tokens in App.css)**

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#0d0120` | Page background |
| `--bg-surface` | `#160332` | Header / Sidebar |
| `--bg-card` | `#1e0a3c` | Cards |
| `--bg-hover` | `#2a1155` | Nav hover |
| `--accent` | `#7c3aed` | Primary violet |
| `--accent-glow` | `#9f5cff` | Glow / active |
| `--accent-muted` | `#3b1870` | Active tab bg |
| `--text-primary` | `#f0e9ff` | Main text |
| `--text-secondary` | `#9b8fc0` | Muted text |
| `--text-muted` | `#5a4e7a` | Hints / labels |
| `--success` | `#22c55e` | Positive trends |
| `--danger` | `#ef4444` | Errors / negative |
| `--warning` | `#f59e0b` | Alerts |

**Font:** Ubuntu (Google Fonts)  
**Border radius:** `--radius: 12px`  
**Transition:** `0.28s cubic-bezier(0.4, 0, 0.2, 1)`

---

## Session Log

### Session 1 — Planning
- Defined full MVP concept: drop → select → analyze → editable dashboard
- Locked all tech stack decisions
- Mapped page purposes and phased build order

### Session 2 — Import UI
- Created `.env` with `VITE_CLAUDE_API_KEY` placeholder
- Built `src/lib/csvParser.js` — PapaParse wrapper with column type detection
- Built `FileDropzone.jsx` — drag/drop, file validation, spinner, animated corner brackets
- Built `DataPreviewTable.jsx` — first 8 rows preview, color-coded type badges
- Built `AnalysisTypeSelector.jsx` — 5 analysis type cards, multi-select, AI auto mode
- Built `DataImport.jsx` — full 3-step page: Drop → Preview → Analyzing loader with orb animation
- Extended `App.css` — all import page styles, design tokens updated with success/danger/warning

### Session 3 — Git Setup
- Fixed `cd /d D:\React\Dashlyze` drive-switch issue (Windows CMD needs `/d` flag)
- Made 9 separate meaningful commits instead of one big commit
- Pushed to GitHub: [github.com/BilalKhalifa/Dashlyze](https://github.com/BilalKhalifa/Dashlyze)

---

## Next Steps (in order)

1. ⬜ Get Claude API key — [console.anthropic.com](https://console.anthropic.com) → paste into `.env`
2. ⬜ Wire "Analyze with AI" button to real Claude API in `DataImport.jsx`
3. ⬜ Write the Claude prompt — sends column names + data preview, gets back dashboard config JSON
4. ⬜ Build `Dashboard.jsx` — renders widgets from AI config JSON
5. ⬜ Install `react-grid-layout` — resizable, draggable widget grid
6. ⬜ Build `WidgetCard.jsx` — wrapper with resize handle + hover edit toolbar
7. ⬜ Wire chart types: LineChart, BarChart, PieChart, StatCard
8. ⬜ Save dashboard to Firebase (Firestore)
9. ⬜ Build Reports page — list of saved dashboards
10. ⬜ Polish — framer-motion animations, empty states, loading skeletons, README

---

## How to Start a New Chat Thread

Paste this message at the start of every new thread:

```
Project: Dashlyze
Please read D:\React\Dashlyze\PROJECT_CONTEXT.md to get up to speed, then we'll continue from the Next Steps list.
```
