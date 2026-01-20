import React from 'react';
import './Header.scss';

const Header = ({ title, subtitle }) => {
  return (
    <header className="top-header">
      {/* Lado Esquerdo: Títulos */}
      <div className="page-titles">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {/* Lado Direito: Pílula de Perfil */}
      <div className="profile-pill">
        <div className="info">
          <strong>Thiago Henrique Domingues</strong>
          <span>Corretor & Dev</span>
        </div>
        <div className="avatar">TD</div>
      </div>
    </header>
  );
};
export default Header;