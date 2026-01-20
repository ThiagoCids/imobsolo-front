// --- IMPORTAÇÕES DO REACT ---
import React from 'react'
import ReactDOM from 'react-dom/client'
// Ferramenta de roteamento
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Estilos globais
import './index.scss'

// --- IMPORTAÇÃO DAS PÁGINAS ---
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Register from './pages/Register/Register' // <--- IMPORTAÇÃO NOVA
import Dashboard from './pages/Dashboard/Dashboard'
import Properties from './pages/Properties/Properties'
import Leads from './pages/Leads/Leads'
import Settings from './pages/Settings/Settings'

// --- CONFIGURAÇÃO DAS ROTAS ---
const router = createBrowserRouter([
  {
    path: "/",          // Rota Raiz (Login)
    element: <Login />, 
  },
  {
    path: "/recuperar-senha",
    element: <ForgotPassword />, 
  },
  {
    path: "/cadastro",  // Rota de Cadastro
    element: <Register />, // <--- AQUI CHAMAMOS O ARQUIVO NOVO
  },
  
  // --- ROTAS DO SISTEMA (Área Logada) ---
  {
    path: "/dashboard",
    element: <Dashboard />, 
  },
  {
    path: "/imoveis",
    element: <Properties />,
  },
  {
    path: "/leads",
    element: <Leads />,
  },
  {
    path: "/configuracoes",
    element: <Settings />,
  },
]);

// --- INICIALIZAÇÃO DO APP ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)