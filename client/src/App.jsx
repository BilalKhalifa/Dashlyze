import { useState } from 'react';
import Header  from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Main    from './components/Main.jsx';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage]   = useState('dashboard');

    return (
        <div className='flex h-screen bg-[var(--bg-base)]'>

            <Sidebar
                isOpen={sidebarOpen}
                activePage={activePage}
                setActivePage={setActivePage}
                onToggle={() => setSidebarOpen(prev => !prev)}
            />

            <div className={`
                flex flex-col flex-1 min-w-0 overflow-hidden
                transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                ${sidebarOpen ? 'ml-[276px]' : 'ml-[100px]'}
            `}>
                <Header
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(prev => !prev)}
                    setActivePage={setActivePage}
                />
                <Main
                    className="overflow-y-auto"
                    activePage={activePage}
                    sidebarOpen={sidebarOpen}
                />
            </div>

        </div>
    );
}

export default App;
