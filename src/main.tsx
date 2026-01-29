import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';

// Context
import { AuthProvider } from './context/AuthContext';

// Páginas
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Properties from './pages/Properties/Properties';
import Leads from './pages/Leads/Leads';
import Settings from './pages/Settings/Settings';

/**
 * Corrigido o caminho do import para refletir a extensão `.ts` do arquivo `Settings`.
 */

// Configuração das rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/recuperar-senha",
    element: <ForgotPassword />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
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

// Renderização com AuthProvider envolvendo tudo
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);