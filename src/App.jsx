import { useState } from 'react';
import Header  from './Components/Header.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Main    from './Components/Main.jsx';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage]   = useState('dashboard');

    return (
        <div className="app">
            <Header
                sidebarOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(prev => !prev)}
                setActivePage={setActivePage}
            />
            <div className="app-body">
                <Sidebar
                    isOpen={sidebarOpen}
                    activePage={activePage}
                    setActivePage={setActivePage}
                />
                <Main
                    activePage={activePage}
                    sidebarOpen={sidebarOpen}
                />
            </div>
        </div>
    );
}

export default App;
