import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importando as nossas páginas
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      {/* O Routes é como se fosse um painel de escolhas */}
      <Routes>
        {/* Se o link for "/" (raiz), mostre o Login */}
        <Route path="/" element={<Login />} />
        
        {/* Se o link for "/dashboard", mostre o Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App