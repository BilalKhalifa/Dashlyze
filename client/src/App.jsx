import { useState } from 'react';
import Header  from './Components/Header.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Main    from './Components/Main.jsx';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage]   = useState('dashboard');

    return (
        <div className="app flex-col flex-1 mt-[100px] h-screen overflow-hidden">
            <Header
                sidebarOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(prev => !prev)}
                setActivePage={setActivePage}
            />
            <div className="flex flex-1 overflow-hidden">
                {/* <Sidebar
                    isOpen={sidebarOpen}
                    activePage={activePage}
                    setActivePage={setActivePage}
                /> */}
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
