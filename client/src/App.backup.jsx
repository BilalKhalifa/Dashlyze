import { useState } from 'react';
import Header  from './Components/Header.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Main    from './Components/Main.jsx';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage]   = useState('dashboard');

    return (
        <div className='flex-row h-full'>
            <Sidebar
                        isOpen={sidebarOpen}
                        activePage={activePage}
                        setActivePage={setActivePage}
                        onToggle={() => setSidebarOpen(prev => !prev)}
            />
            <div className='flex-col'>
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
