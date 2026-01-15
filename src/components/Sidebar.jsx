import React from 'react'
import './Sidebar.scss'
// IMPORTANTE: Agora importamos a imagem da pasta assets (voltamos 2 pastas com ../..)
import logo from '../assets/logo-imobsolo.png'
const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Usamos a variável {logo} aqui dentro */}
      <div className="logo">
        <img src={logo} alt="Logo ImobSolo" />
      </div>

      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Meus Imóveis</li>
          <li>Clientes</li>
          <li>Matches</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar