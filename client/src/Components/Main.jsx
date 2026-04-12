import Dashboard  from '../Pages/Dashboard.jsx';
import Analytics  from '../Pages/Analytics.jsx';
import Reports    from '../Pages/Reports.jsx';
import DataImport from '../Pages/DataImport.jsx';
import Settings   from '../Pages/Settings.jsx';

const pages = {
    'dashboard':   <Dashboard />,
    'analytics':   <Analytics />,
    'reports':     <Reports />,
    'data-import': <DataImport />,
    'settings':    <Settings />,
};

function Main({ activePage, sidebarOpen }) {
    return (
        <main className={`main ${sidebarOpen ? 'main--shifted' : ''}`}>
            {pages[activePage] ?? <Dashboard />}
        </main>
    );
}

export default Main;
