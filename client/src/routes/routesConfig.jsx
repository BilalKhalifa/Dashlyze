import { LayoutDashboard, ChartArea, Flag, BetweenHorizontalEnd, Calendar1, CalendarDays, CalendarRange } from 'lucide-react';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import Reports from '../pages/Reports';
import DataImport from '../pages/DataImport';
import { PATHS } from './path';

export const ROUTES = [
    { path: PATHS.ROOT, label: 'Dashboard', icon: LayoutDashboard, element: <Dashboard /> },
    { path: PATHS.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard, element: <Dashboard /> },
    { path: PATHS.ANALYTICS, label: 'Analytics', icon: ChartArea, element: <Analytics /> },
    { path: PATHS.REPORTS, label: 'Reports', icon: Flag, element: <Reports />, children: [
        {path: PATHS.REPORTS_MONTHLY, label: 'Monthly', icon: Calendar1 , element: <div>Monthly Reports</div>},
        {path: PATHS.REPORTS_QUARTERLY, label: 'Quarterly', icon: CalendarDays , element: <div>Quarterly Reports</div>},
        {path: PATHS.REPORTS_ANNUAL, label: 'Annual', icon: CalendarRange , element: <div>Annual Reports</div>},
    ] },
    { path: PATHS.DATAIMPORT, label: 'Data Import', icon: BetweenHorizontalEnd, element: <DataImport /> },
]
