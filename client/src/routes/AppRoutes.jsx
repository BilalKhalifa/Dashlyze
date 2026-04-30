import React from 'react'
import { Route, Routes } from 'react-router-dom'

const index = () => {
  return (
    <Routes>
        {ROUTES.map(route =>(
            <Route key = {route.path} path = {route.path} element = {route.element} />
        ))}
        <Route path = {PATHS.ROOT} element = {<Navigate to = {PATHS.DASHBOARD} replace/>} /> 
        <Route path = "*" element = {<div>404 Not Found</div>} />
    </Routes>
  )
}

export default index