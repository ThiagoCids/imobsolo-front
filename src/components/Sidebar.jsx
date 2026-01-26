import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import {
  MdOutlineDashboard,
  MdOutlineHomeWork,
  MdOutlineGroup,
  MdOutlineHandshake,
  MdOutlineSettings
} from 'react-icons/md';
import './Sidebar.scss';
import logo from '../assets/logo-imobsolo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fechar menu ao mudar de página
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Fechar menu ao redimensionar a tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: MdOutlineDashboard },
    { label: 'Meus Imóveis', path: '/imoveis', icon: MdOutlineHomeWork },
    { label: 'Clientes', path: '/leads', icon: MdOutlineGroup },
    { label: 'Matches', path: '/matches', icon: MdOutlineHandshake },
    { label: 'Configurações', path: '/configuracoes', icon: MdOutlineSettings },
  ];

  return (
    <>
      {/* Botão Hamburger (visível apenas em mobile) */}
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay (visível apenas quando menu está aberto) */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Área da Logo */}
        <div className="logo-area">
          <img src={logo} alt="ImobSolo Logo" className="logo-img" />
        </div>

        {/* Menu de Navegação */}
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link to={item.path} className="nav-link">
                    <Icon className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Rodapé (aparece só em desktop) */}
        <div className="sidebar-footer">
          <p className="version">v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;