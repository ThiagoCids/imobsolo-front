import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';
import type { HeaderProps } from '../types';
import './Header.scss';

/**
 * Header - Componente Organismo de Layout
 * 
 * Responsável por exibir o cabeçalho da aplicação com:
 * - Título e subtítulo da página
 * - Informações do usuário logado
 * - Botão de logout
 * 
 * Padrão Atomic Design: ORGANISMO
 * - Composto por vários átomos
 * - Contém lógica mínima (apenas chamadas à API/Context)
 * 
 * NOTA: O logout é chamado diretamente via useAuth Hook
 * 
 * POR QUÊ TypeScript?
 * - Props tipificadas garantem que title e subtitle sejam strings
 * - React.FC<HeaderProps> documenta interface esperada
 * - IDEs oferecem autocomplete para props
 * 
 * @component
 * @param {HeaderProps} props - Props do Header
 * @param {string} props.title - Título da página
 * @param {string} [props.subtitle] - Subtítulo ou mensagem de boas-vindas (opcional)
 * 
 * @example
 * <Header 
 *   title="Dashboard" 
 *   subtitle="Bem-vindo de volta, João"
 * />
 */
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user, logout } = useAuth();

  /**
   * Função para fazer logout
   * 
   * Chama o método logout do contexto de autenticação
   * 
   * POR QUÊ usar arrow function?
   * - Garante que 'this' não mude de contexto
   * - Mais seguro em callbacks
   */
  const handleLogout = (): void => {
    logout();
  };

  return (
    <header className="top-header">
      {/* Lado Esquerdo: Títulos da Página */}
      <div className="page-titles">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {/* Lado Direito: Seção de Perfil e Logout */}
      <div className="profile-section">
        {/* Pílula com Informações do Usuário */}
        <div className="profile-pill">
          <div className="info">
            <strong>{user?.nome || 'Usuário'}</strong>
            <span>{user?.role || 'Corretor'}</span>
          </div>
          <div className="avatar">{user?.avatar || 'U'}</div>
        </div>
        
        {/* Botão de Logout */}
        <button 
          className="logout-btn" 
          onClick={handleLogout} 
          aria-label="Sair da aplicação"
          title="Fazer logout"
          type="button"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
