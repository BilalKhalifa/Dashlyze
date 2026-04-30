import { LayoutDashboard, ChartArea, Flag, BetweenHorizontalEnd } from 'lucide-react';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import Reports from '../pages/Reports';
import DataImport from '../pages/DataImport';
import { PATHS } from './path';

export const ROUTES = [
    { path: PATHS.ROOT, label: 'Dashboard', icon: LayoutDashboard, element: <Dashboard /> },
    { path: PATHS.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard, element: <Dashboard /> },
    { path: PATHS.ANALYTICS, label: 'Analytics', icon: ChartArea, element: <Analytics /> },
    { path: PATHS.REPORTS, label: 'Reports', icon: Flag, element: <Reports /> },
    { path: PATHS.DATAIMPORT, label: 'Data Import', icon: BetweenHorizontalEnd, element: <DataImport /> },
]
