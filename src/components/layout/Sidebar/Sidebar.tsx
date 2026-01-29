import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import {
  MdOutlineDashboard,
  MdOutlineHomeWork,
  MdOutlineGroup,
  MdOutlineHandshake,
  MdOutlineSettings
} from 'react-icons/md';
import { useSidebarMenu } from '../hooks/useSidebarMenu';
import type { SidebarProps, MenuItem } from '../types';
import './Sidebar.scss';
import logo from '../../../assets/logo-imobsolo.png';

/**
 * Sidebar - Componente Organismo de Layout
 * 
 * Barra de navegação lateral com menu responsivo.
 * 
 * REFATORAÇÃO (FASE 2):
 * Este componente agora é um "componente burro" - sua única responsabilidade
 * é RENDERIZAR a interface. Toda a lógica de estado foi movida para um hook
 * customizado chamado useSidebarMenu().
 * 
 * POR QUÊ?
 * - Componentes focados em renderização são mais fáceis de testar
 * - Hooks podem ser reutilizados em outros componentes
 * - Lógica centralizada fica mais fácil de manter
 * - Separação clara entre apresentação e lógica
 * 
 * CONVERSÃO PARA TYPESCRIPT:
 * - Tipagem de props com interface SidebarProps
 * - Tipo para menuItems (MenuItem[])
 * - Tipagem de callbacks e handlers
 * - Melhor autocomplete e validação em tempo de compilação
 * 
 * Características:
 * - Em desktop: sempre visível
 * - Em mobile: escondida por padrão, abre com hamburger menu
 * - Inclui overlay quando aberta em mobile
 * - Fecha automaticamente ao redimensionar (lógica no hook)
 * 
 * Padrão Atomic Design: ORGANISMO
 * - Combina vários componentes de navegação
 * - Recebe todo o estado via hook customizado
 * 
 * HOOKS UTILIZADOS:
 * - useSidebarMenu(): Gerencia estado de abertura/fechamento e resize
 * 
 * @component
 * @param {SidebarProps} props - Props do Sidebar
 * @param {MenuItem[]} [props.items] - Itens customizados do menu
 * @param {boolean} [props.isOpen] - Controlar se sidebar está aberta
 * @param {() => void} [props.onClose] - Callback ao fechar
 * @param {string} [props.className] - Classes CSS adicionais
 * 
 * @example
 * // Uso simples (padrão)
 * <Sidebar />
 * 
 * @example
 * // Uso customizado
 * <Sidebar 
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   items={customMenuItems}
 * />
 */
const Sidebar: React.FC<SidebarProps> = ({ 
  items: customItems,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  className 
}) => {
  // Hook customizado que gerencia lógica do menu
  // Se props externas forem fornecidas, usa elas; senão usa o hook
  const hookState = useSidebarMenu();
  const isOpen = externalIsOpen ?? hookState.isOpen;
  const close = externalOnClose ?? hookState.close;
  const toggle = hookState.toggle;

  /**
   * Itens padrão do menu de navegação
   * 
   * POR QUÊ não usar constantes externas ainda?
   * - Manter componente auto-contido
   * - Facilita testes isolados
   * - Pode ser movido para constantes em refatoração futura
   * 
   * Cada item contém:
   * - label: texto exibido
   * - path: rota para navegação
   * - icon: componente de ícone
   */
  const defaultMenuItems: MenuItem[] = [
    { 
      id: 'dashboard',
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: <MdOutlineDashboard className="nav-icon" />
    },
    { 
      id: 'imoveis',
      label: 'Meus Imóveis', 
      path: '/imoveis', 
      icon: <MdOutlineHomeWork className="nav-icon" />
    },
    { 
      id: 'leads',
      label: 'Clientes', 
      path: '/leads', 
      icon: <MdOutlineGroup className="nav-icon" />
    },
    { 
      id: 'matches',
      label: 'Matches', 
      path: '/matches', 
      icon: <MdOutlineHandshake className="nav-icon" />
    },
    { 
      id: 'settings',
      label: 'Configurações', 
      path: '/configuracoes', 
      icon: <MdOutlineSettings className="nav-icon" />
    },
  ];

  // Usa itens customizados se fornecidos, senão usa padrão
  const menuItems = customItems || defaultMenuItems;

  /**
   * Função para fechar sidebar ao clicar em um item
   * 
   * POR QUÊ?
   * - Em mobile, o usuário espera que o menu feche ao selecionar
   * - Melhora UX
   */
  const handleItemClick = (): void => {
    if (window.innerWidth < 768) {
      close();
    }
  };

  return (
    <>
      {/* 
        Botão Hamburger
        Visível apenas em mobile (max-width: 768px)
        Alterna entre abrir/fechar sidebar
      */}
      <button
        className="hamburger-btn"
        onClick={toggle}
        aria-label="Abrir menu de navegação"
        aria-expanded={isOpen}
        type="button"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* 
        Overlay
        Visível apenas em mobile quando sidebar está aberta
        Ao clicar, fecha a sidebar
      */}
      {isOpen && <div className="sidebar-overlay" onClick={close} />}

      {/* Sidebar Principal */}
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${className || ''}`}>
        {/* Área da Logo */}
        <div className="logo-area">
          <img src={logo} alt="ImobSolo Logo" className="logo-img" />
        </div>

        {/* Menu de Navegação */}
        <nav className="sidebar-nav" aria-label="Menu de navegação principal">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link 
                  to={item.path} 
                  className="nav-link"
                  onClick={handleItemClick}
                >
                  {typeof item.icon === 'string' ? (
                    <span className="nav-icon">{item.icon}</span>
                  ) : (
                    item.icon
                  )}
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé da Sidebar - Versão */}
        <div className="sidebar-footer">
          <p className="version">v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
