import React from 'react'
import { LayoutDashboard, ChartArea, Flag, BetweenHorizontalEnd } from 'lucide-react';

const NAV_ITEMS =[
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: ChartArea },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'data-import', label: 'Data Import', icon: BetweenHorizontalEnd }
];

function NavItem({ item, isActive, isOpen, onClick }){
    const Icon = item.icon;
    return(
        <button
            onClick={() => onClick(item.id)}
            title = {!isOpen ? item.label : undefined}
            className={`
                group relative flex items-center gap-3 w-full px-3 py-2 rounded-lg 
                transition-all duration-[300ms] ease-cubic-bezier(0.4, 0, 0.2, 1)
                ${isActive 
                    ? 'bg-[var(--accent)] text-[var(--text-primary)] shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                }
                `}
        >
            <Icon size={20} 
                className={`shrink-0 transition-transform duration-[300ms] ease-cubic-bezier(0.4, 0, 0.2, 1)
                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}`
                }
            />

            <span 
                className = {`
                    text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-[300ms] ease-cubic-bezier(0.4, 0, 0.2, 1)
                    ${isOpen ? 'w-auto opacity-100 ' : 'w-0 opacity-0'}
                    `}
            >
                {item.label}
            </span>

            {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--accent-glow)] rounded-full" />
            )}
        </button>
    );
}

const Sidebar = () => {
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar
