import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Logo com ícone e texto */}
      <div className="logo-area">
        <span className="logo-icon">🏠</span>
        <h2>ImobSolo</h2>
      </div>

      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/imoveis">Meus Imóveis</Link></li>
          <li><Link to="/leads">Clientes</Link></li>
          {/* Novo item que vi na sua imagem */}
          <li><Link to="/matches">Matches</Link></li>
          <li><Link to="/configuracoes">Configurações</Link></li>
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;