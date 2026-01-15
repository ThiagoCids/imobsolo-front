import React from 'react'
import './Header.scss'

const Header = () => {
  return (
    <header className="header">
      {/* Lado Esquerdo: Título da Página */}
      <div className="header-title">
        <h1>Dashboard Principal</h1>
        <p>Bem-vindo de volta, Thiago!</p>
      </div>

      {/* Lado Direito: Card do Perfil */}
      <div className="header-profile">
        <div className="profile-info">
          <strong>Thiago Henrique Domingues</strong>
          <span>Corretor & Dev</span>
        </div>
        {/* Placeholder de foto (um círculo cinza por enquanto se não tiver imagem) */}
        <img src="https://ui-avatars.com/api/?name=Thiago+Henrique+Domingues&background=4318FF&color=fff" alt="Perfil" />
      </div>
    </header>
  )
}

export default Header