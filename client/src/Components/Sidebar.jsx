// CHANGE 5: Rewrote Sidebar.jsx to use React Router NavLink instead of state-based buttons
// Now clicking sidebar items navigates via URL routes instead of managing local activePage state
import React from 'react'
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ChartArea, Flag, BetweenHorizontalEnd, ChevronLeft } from 'lucide-react';
import { PATHS } from '../routes/path';

const NAV_ITEMS =[
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: PATHS.DASHBOARD },
    { id: 'analytics', label: 'Analytics', icon: ChartArea, path: PATHS.ANALYTICS },
    { id: 'reports', label: 'Reports', icon: Flag, path: PATHS.REPORTS },
    { id: 'data-import', label: 'Data Import', icon: BetweenHorizontalEnd, path: PATHS.DATAIMPORT }
];

function NavItem({ item, isOpen }){
    const Icon = item.icon;
    return(
        // CHANGE 5a: Using NavLink from react-router-dom to handle route navigation
        // NavLink automatically applies 'active' class when route matches
        <NavLink
            to={item.path}
            title = {!isOpen ? item.label : undefined}
            className={({ isActive }) => `
                group relative flex items-center gap-3 w-full px-3 py-2 rounded-lg 
                transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isActive 
                    ? 'bg-[var(--accent)] text-[var(--text-primary)] shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                }
                `}
        >
            {({ isActive }) => (
                <>
                    <Icon size={20} 
                        className={`shrink-0 transition-transform duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                            ${isActive ? 'scale-110' : 'group-hover:scale-105'}`
                        }
                    />

                    <span 
                        className = {`
                            text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                            ${isOpen ? 'w-auto opacity-100 ' : 'w-0 opacity-0'}
                            `}
                    >
                        {item.label}
                    </span>

                    {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--accent-glow)] rounded-full" />
                    )}
                </>
            )}
        </NavLink>
    );
}

// CHANGE 5b: Removed activePage and setActivePage props from Sidebar signature
// Sidebar now only manages its own open/closed state
function Sidebar({ isOpen, onToggle }){
    return(
        <aside
            className={`
                fixed flex flex-col shrink-0 py-4 px-2
                bg-[var(--bg-surface)] border border-[var(--border)]
                shadow-[0_0_30px_rgba(124,58,237,0.15)]
                rounded-2xl m-3 h-[calc(100vh-24px)]
                transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                z-50
                ${isOpen ? 'w-60' : 'w-16'}
            `}
        >
            <nav 
                className="flex flex-col gap-2 mt-4"
            >
                {NAV_ITEMS.map((item) => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isOpen={isOpen}
                    />
                ))}
            </nav>

            <div className="h-px bg-[var(--border)] my-4" />

            <button
                onClick={onToggle}
                className={`
                    flex items-center gap-3 w-full px-4 py-3 rounded-xl
                    text-[var(--accent)] hover:text-[var(--accent-glow)]
                    hover:bg-[var(--bg-hover)] transition-colors duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                `}
                title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                {isOpen
                    ? <ChevronLeft size={20} className='shrink-0 transition-transform duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]'/>
                    : <ChevronLeft size={20} className='shrink-0 rotate-180 transition-transform duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]' />
                }
                <span 
                    className={`
                        text-sm whitespace-nowrap overflow-hidden transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${ isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}
                    `}
                >
                    Collapse
                </span>
            </button>
        </aside>
    );
}

export default Sidebar
