// --- IMPORTAÇÕES DO REACT ---
import React from 'react'
import ReactDOM from 'react-dom/client'
// Importa as ferramentas de roteamento (GPS do site)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Importa o estilo global
import './index.scss'

// --- IMPORTAÇÃO DAS PÁGINAS REAIS ---
// Aqui está a mágica: em vez de criar componentes falsos, importamos os arquivos que você já tem!
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import Properties from './pages/Properties/Properties'
import Leads from './pages/Leads/Leads'
import Settings from './pages/Settings/Settings'

// --- CONFIGURAÇÃO DAS ROTAS ---
const router = createBrowserRouter([
  {
    path: "/",          // Rota inicial
    element: <Login />, // Chama o arquivo Login.jsx
  },
  {
    path: "/recuperar-senha",
    element: <ForgotPassword />, // Chama o arquivo ForgotPassword.jsx
  },
  {
    path: "/cadastro",
    element: <h1>Criar Conta (Em breve)</h1>, // Temporário, depois criamos a página
  },
  // --- ROTAS DO SISTEMA (DASHBOARD) ---
  {
    path: "/dashboard",
    element: <Dashboard />, // Agora vai carregar o seu Dashboard.jsx real
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

// --- INICIALIZAÇÃO ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
