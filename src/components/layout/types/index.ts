/**
 * TIPOS DOS COMPONENTES DE LAYOUT
 * 
 * Tipos específicos para componentes de layout (Header, Sidebar, Footer)
 * Facilita tipagem de props dos componentes.
 * 
 * ESTRUTURA:
 * - HeaderProps: Props do Header
 * - SidebarProps: Props do Sidebar
 * - FooterProps: Props do Footer
 * - MenuItem: Item de menu
 */

import type { PropsWithChildren, ReactNode } from 'react';

/**
 * Tipo: MenuItem
 * 
 * Representa um item de menu na sidebar.
 * 
 * @typedef {Object} MenuItem
 * @property {string} id - ID único do item
 * @property {string} label - Texto exibido
 * @property {string} path - Caminho da rota
 * @property {ReactNode | string} [icon] - Ícone (react-icons ou emoji string)
 * @property {boolean} [active] - Se está ativo
 * @property {MenuItem[]} [children] - Submenu (para futuro)
 */
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode | string;
  active?: boolean;
  children?: MenuItem[];
}

/**
 * Tipo: HeaderProps
 * 
 * Props do componente Header
 * 
 * @typedef {Object} HeaderProps
 * @property {string} title - Título da página
 * @property {string} [subtitle] - Subtítulo ou boas-vindas
 * @property {() => void} [onMenuToggle] - Callback ao clicar menu (mobile)
 */
export interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

/**
 * Tipo: SidebarProps
 * 
 * Props do componente Sidebar
 * 
 * @typedef {Object} SidebarProps
 * @property {MenuItem[]} items - Itens de menu
 * @property {boolean} [isOpen] - Se está aberto (mobile)
 * @property {() => void} [onClose] - Callback ao fechar
 * @property {string} [className] - Classes CSS customizadas
 */
export interface SidebarProps {
  items?: MenuItem[];
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

/**
 * Tipo: FooterProps
 * 
 * Props do componente Footer
 * 
 * @typedef {Object} FooterProps
 * @property {string} [year] - Ano para copyright (default: ano atual)
 * @property {string} [companyName] - Nome da empresa
 * @property {ReactNode} [children] - Conteúdo customizado
 */
export interface FooterProps extends PropsWithChildren {
  year?: number;
  companyName?: string;
  children?: ReactNode;
}
