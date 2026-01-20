import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
// Importando a imagem da logo corretamente
import logo from '../assets/logo-imobsolo.png'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Área da Logo com Imagem */}
      <div className="logo-area">
        <img src={logo} alt="ImobSolo Logo" className="logo-img" />
      </div>

      <nav>
        <ul>
          {/* Removi os emojis para alinhar com o design limpo da sua referência */}
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/imoveis">Meus Imóveis</Link></li>
          <li><Link to="/leads">Clientes</Link></li>
          <li><Link to="/matches">Matches</Link></li>
          <li><Link to="/configuracoes">Configurações</Link></li>
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;