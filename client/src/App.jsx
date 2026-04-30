// CHANGE 1: Removed unused state (sidebarOpen, activePage) and simplified App.jsx
// AppLayout now manages its own sidebar state and uses React Router for page navigation
import { AppLayout } from './layouts/AppLayout.jsx';

function App() {
    return (
        <AppLayout />
    );
}

export default App;
