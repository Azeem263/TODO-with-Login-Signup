import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({children}) {

    const isloggin = localStorage.getItem('login')

    if (!isloggin) {
        return <Navigate to="/login" replace/>
    }

  return children
  
}

export default Protected
