import { useState } from 'react';

const menuItems = [
    { id: 'dashboard',   label: 'Dashboard',   icon: '◈' },
    { id: 'analytics',   label: 'Analytics',   icon: '◉' },
    { id: 'reports',     label: 'Reports',     icon: '◧' },
    { id: 'data-import', label: 'Data Import', icon: '◫' },
    { id: 'settings',    label: 'Settings',    icon: '◎' },
];

function Sidebar({ isOpen, activePage, setActivePage }) {
    return (
        <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? 'nav-item--active' : ''}`}
                        onClick={() => setActivePage(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {isOpen && <span className="nav-label">{item.label}</span>}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
