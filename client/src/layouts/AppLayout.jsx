import React from 'react'
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AppRoutes from '../routes/AppRoutes';

export const AppLayout = () => {
  
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
    <div className='flex h-screen bg-[var(--bg-base)]'>
        {/* CHANGE 2: Removed setActivePage prop - Sidebar now uses NavLink for route-based navigation */}
        <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={()=> setSidebarOpen((prev) => !prev)}
        />
        <div className={`
                flex-col flex-1 overflow-hidden
                transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                ${sidebarOpen ? 'ml-[276px]' : 'ml-[100px]'}`
                }
        >
            <Header />
            <main className='w-full overflow-y-auto'>
              <AppRoutes />
            </main>
        </div>
    </div>
  )
}
