# Dashlyze — Project Context
> Read this file at the start of every new chat thread.
> Keep it updated after every session.

---

## Project Info
- **Name:** Dashlyze
- **Type:** AI-powered React analytics dashboard
- **Location:** `D:\React\Dashlyze`
- **Repo:** Public GitHub (building for strong profile)
- **Stack:** React 19 + Vite 7 + Tailwind CSS v4 + Firebase + Recharts + PapaParse + Lucide React

---

## Core MVP Concept
1. User drags & drops a CSV/TSV file
2. User selects analysis type (Trends, Comparison, Distribution, Summary, or AI Auto)
3. Clicks "Analyze with AI" → Claude API reads the data → returns a dashboard config JSON
4. App renders a fully interactive dashboard from the config (Recharts widgets)
5. User can **resize** and **reorder** cards (react-grid-layout), edit titles, change chart types

---

## Tech Decisions (Locked)
| Decision | Choice | Reason |
|---|---|---|
| AI backend | Claude API (Anthropic) | Already decided |
| Database | Firebase (Firestore) | Already installed, free tier |
| Charts | Recharts | Already installed |
| Grid layout | react-grid-layout | Best for resizable dashboard cards |
| Animations | framer-motion | To be installed |
| API key storage | `.env` file (Vite) | `VITE_CLAUDE_API_KEY` |

---

## Folder Structure
```
src/
├── Components/
│   ├── Header.jsx          ✅ done — logo, hamburger, brand
│   ├── Sidebar.jsx         ✅ done — nav items, collapse
│   ├── Main.jsx            ✅ done — page router
│   └── import/
│       ├── FileDropzone.jsx          ✅ done
│       ├── DataPreviewTable.jsx      ✅ done
│       └── AnalysisTypeSelector.jsx  ✅ done
├── Pages/
│   ├── Dashboard.jsx       ⬜ placeholder only
│   ├── Analytics.jsx       ⬜ placeholder only
│   ├── DataImport.jsx      ✅ done — 3-step flow (Drop → Preview → Analyzing)
│   ├── Reports.jsx         ⬜ placeholder only
│   └── Settings.jsx        ⬜ placeholder only
├── lib/
│   └── csvParser.js        ✅ done — PapaParse wrapper, type detection
├── Style/
│   └── App.css             ✅ done — full design system + import page styles
└── App.jsx                 ✅ done — shell with sidebar + header state
```

---

## Design System (App.css tokens)
```css
--bg-base:        #0d0120   /* page background */
--bg-surface:     #160332   /* header / sidebar */
--bg-card:        #1e0a3c   /* cards */
--bg-hover:       #2a1155
--accent:         #7c3aed   /* primary violet */
--accent-glow:    #9f5cff
--accent-muted:   #3b1870
--text-primary:   #f0e9ff
--text-secondary: #9b8fc0
--text-muted:     #5a4e7a
--success:        #22c55e
--danger:         #ef4444
--warning:        #f59e0b
--radius:         12px
--transition:     0.28s cubic-bezier(0.4, 0, 0.2, 1)
```
Font: Ubuntu (Google Fonts)

---

## Session Log

### Session 1 — Planning
- Defined full MVP concept (drop → analyze → editable dashboard)
- Chose tech stack, locked all decisions
- Mapped page purposes and build order

### Session 2 — Import UI
- Created `.env` with `VITE_CLAUDE_API_KEY` placeholder
- Built `src/lib/csvParser.js` (PapaParse + column type detection)
- Built `FileDropzone.jsx` — drag/drop, error handling, spinner, corner animations
- Built `DataPreviewTable.jsx` — first 8 rows, color-coded type badges (number/date/string)
- Built `AnalysisTypeSelector.jsx` — 5 cards, multi-select, AI auto mode
- Built full `DataImport.jsx` — 3-step page: Drop → Preview → Analyzing loader with orb animation
- Extended `App.css` with all import page styles

---

## Next Steps (do these in order)
1. ⬜ Get Claude API key from console.anthropic.com → paste into `.env`
2. ⬜ Wire "Analyze with AI" button to real Claude API in `DataImport.jsx`
3. ⬜ Build dashboard config JSON prompt for Claude
4. ⬜ Build `Dashboard.jsx` — renders widgets from AI config JSON
5. ⬜ Install + integrate `react-grid-layout` for resizable cards
6. ⬜ Build `WidgetCard.jsx` — wrapper with resize handle + edit toolbar
7. ⬜ Wire chart types: LineChart, BarChart, PieChart, StatCard
8. ⬜ Save dashboard to Firebase
9. ⬜ Reports page — list of saved dashboards
10. ⬜ Polish — framer-motion animations, empty states, skeletons

---

## How to Start a New Chat Thread
Paste this at the start:
```
Project: Dashlyze — D:\React\Dashlyze
Please read D:\React\Dashlyze\PROJECT_CONTEXT.md to get up to speed, then we'll continue from the Next Steps list.
```
