import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routesConfig'
import { PATHS } from './path'

const AppRoutes = () => {
  return (
    <Routes>
        {ROUTES.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path={PATHS.ROOT} element={<Navigate to={PATHS.DASHBOARD} replace />} />
        <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes
