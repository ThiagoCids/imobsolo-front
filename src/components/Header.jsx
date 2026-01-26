import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';
import './Header.scss';

const Header = ({ title, subtitle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="top-header">
      {/* Lado Esquerdo: Títulos */}
      <div className="page-titles">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {/* Lado Direito: Pílula de Perfil */}
      <div className="profile-section">
        <div className="profile-pill">
          <div className="info">
            <strong>{user?.nome || 'Usuário'}</strong>
            <span>{user?.role || 'Corretor'}</span>
          </div>
          <div className="avatar">{user?.avatar || 'U'}</div>
        </div>
        <button className="logout-btn" onClick={logout} aria-label="Logout">
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;