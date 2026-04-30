import React from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export const AppLayout = () => {
  
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
    <div className='flex h-screen bg-[var(--bg-base)]'>
        <Sidebar isOpen={sidebarOpen} onToggle={()=> setSidebarOpen((prev) => !prev)} />
        <div className={`flex flex-col flex-1 min-w-0 overflow-hidden`}>
            <Header />
            <main className='w-full overflow-y-auto'>
              <AppRoutes />
            </main>
        </div>
    </div>
  )
}
