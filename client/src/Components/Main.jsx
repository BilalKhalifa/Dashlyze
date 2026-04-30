import Dashboard  from '../pages/Dashboard.jsx';
import Analytics  from '../pages/Analytics.jsx';
import Reports    from '../pages/Reports.jsx';
import DataImport from '../pages/DataImport.jsx';
import Settings   from '../pages/Settings.jsx';

const pages = {
    'dashboard':   <Dashboard />,
    'analytics':   <Analytics />,
    'reports':     <Reports />,
    'data-import': <DataImport />,
    'settings':    <Settings />
};

function Main({ activePage, sidebarOpen }) {
    return (
        <main className={`w-full overflow-y-auto p-6 transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]`}>
            {pages[activePage] ?? <Dashboard />}
        </main>
    );
}

export default Main;
