import Dashboard  from '../pages/Dashboard.jsx';
import Analytics  from '../Pages/Analytics.jsx';
import Reports    from '../pages/Reports.jsx';
import DataImport from '../pages/DataImport.jsx';
import Settings   from '../pages/Settings.jsx';

const pages = {
    'dashboard':   <Dashboard />,
    'analytics':   <Analytics />,
    'reports':     <Reports />,
    'data-import': <DataImport />,
    'settings':    <Settings />,
};

function Main({ activePage, sidebarOpen }) {
    return (
        <main className={`w-full main ${sidebarOpen ? 'main--shifted' : ''}`}>
            {pages[activePage] ?? <Dashboard />}
        </main>
    );
}

export default Main;
