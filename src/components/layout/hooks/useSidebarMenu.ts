/**
 * Hook Customizado: useSidebarMenu (com TypeScript)
 * 
 * Responsabilidade:
 * Gerenciar o estado e lógica de abertura/fechamento da sidebar
 * 
 * POR QUÊ separar em um hook?
 * - Reutilização: Vários componentes podem precisar dessa lógica
 * - Testabilidade: Hooks são fáceis de testar
 * - Clareza: Componentes ficam focados em renderização
 * - Manutenção: Lógica centralizada em um só lugar
 * 
 * COMPORTAMENTO:
 * - Inicia sempre fechado (mobile-first)
 * - Fecha ao redimensionar para desktop (>= 768px)
 * - Fornece métodos para abrir/fechar/toggle
 */

import { useState, useEffect } from 'react';

/**
 * Tipo: SidebarMenuReturn
 * 
 * Retorno do hook useSidebarMenu
 * 
 * @typedef {Object} SidebarMenuReturn
 * @property {boolean} isOpen - Menu está aberto?
 * @property {() => void} toggle - Alterna aberto/fechado
 * @property {() => void} close - Fecha o menu
 * @property {() => void} open - Abre o menu
 */
export interface SidebarMenuReturn {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

/**
 * Hook: useSidebarMenu
 * 
 * Gerencia o estado do menu lateral (sidebar) com responsividade.
 * 
 * @returns {SidebarMenuReturn} Objeto com estado e métodos do menu
 * 
 * @example
 * const { isOpen, toggle, close } = useSidebarMenu();
 * 
 * <button onClick={toggle}>
 *   {isOpen ? 'Fechar' : 'Abrir'}
 * </button>
 * <div className={isOpen ? 'open' : 'closed'}>
 *   Menu content aqui
 * </div>
 */
export const useSidebarMenu = (): SidebarMenuReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * EFEITO 1: Monitora redimensionamento da janela
   * 
   * POR QUÊ?
   * Em mobile, queremos que o menu feche quando o usuário
   * redimensiona a tela para desktop (ou vice-versa).
   * 
   * Assim, a experiência fica consistente: usuário abre em mobile,
   * e se redimensionar para desktop, o menu volta ao estado padrão.
   */
  useEffect(() => {
    const handleResize = (): void => {
      // Se passou para desktop (>= 768px), fecha o menu
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // Registra o listener
    window.addEventListener('resize', handleResize);

    // Cleanup: remove o listener quando o componente desmonta
    // Muito importante para evitar memory leaks!
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Alterna o estado do menu (aberto ↔ fechado)
   */
  const toggle = (): void => setIsOpen(prev => !prev);

  /**
   * Fecha o menu (garante que ficará fechado)
   */
  const close = (): void => setIsOpen(false);

  /**
   * Abre o menu (garante que ficará aberto)
   */
  const open = (): void => setIsOpen(true);

  // Retorna um objeto com tudo que o componente precisa
  return {
    isOpen,
    toggle,
    close,
    open,
  };
};

export default useSidebarMenu;
