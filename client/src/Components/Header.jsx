import { ChevronRight } from 'lucide-react';

function DashlyzeLogoSVG() {
    return (
        <svg
            width="160"
            height="36"
            viewBox="0 0 160 36"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Dashlyze"
        >
            {/* ── Icon Mark ── */}
            <rect x="0" y="2" width="32" height="32" rx="7" fill="rgba(124,58,237,0.18)" stroke="rgba(124,58,237,0.4)" strokeWidth="1" />

            {/* Bars */}
            <rect x="5"  y="20" width="5" height="9"  rx="1.5" fill="#7c3aed" opacity="0.6" />
            <rect x="12" y="15" width="5" height="14" rx="1.5" fill="#9f5cff" opacity="0.8" />
            <rect x="19" y="9"  width="5" height="20" rx="1.5" fill="#7c3aed" />

            {/* Accent dot on tallest bar */}
            <circle cx="21.5" cy="7" r="2.5" fill="#EF9F27" />

            {/* Trend line */}
            <line x1="14.5" y1="12" x2="21.5" y2="7" stroke="#EF9F27" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

            {/* Baseline */}
            <rect x="3" y="30" width="26" height="1.5" rx="0.75" fill="#7c3aed" opacity="0.2" />

            {/* ── Wordmark ── */}
            <text
                x="40"
                y="24"
                fontFamily="'Ubuntu', sans-serif"
                fontWeight="700"
                fontSize="19"
                letterSpacing="-0.4"
                fill="#f0e9ff"
            >
                Dash
            </text>
            <text
                x="84"
                y="24"
                fontFamily="'Ubuntu', sans-serif"
                fontWeight="700"
                fontSize="19"
                letterSpacing="-0.4"
                fill="#9f5cff"
            >
                lyze
            </text>
        </svg>
    );
}

function Header({ sidebarOpen, toggleSidebar, setActivePage }) {
    return (
        <div className="fixed top-0 left-0 right-0 h-[60px] bg-[var(--bg-surface)] z-[100] flex items-center px-4 py-2 shadow-[10px_10px_30px_rgba(159, 92, 255, 0.2)]
        rounded-lg m-2
        ">
            <button
                className={`menu-btn ${sidebarOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
            <ChevronRight />
            </button>

            <div
                className="header-brand"
                onClick={() => setActivePage('dashboard')}
                style={{ cursor: 'pointer' }}
                title="Go to Dashboard"
            >
                <DashlyzeLogoSVG />
            </div>
        </div>
    );
}

export default Header;
