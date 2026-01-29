import React from 'react';
import type { FooterProps } from '../types';
import './Footer.scss';

/**
 * Footer - Componente Organismo de Layout
 * 
 * Rodapé simples e genérico da aplicação.
 * 
 * Características:
 * - Componente "burro" (stateless)
 * - Apenas exibe copyright e informações da aplicação
 * - Sem lógica ou interatividade
 * 
 * Padrão Atomic Design: ORGANISMO
 * - Componente simples de layout
 * - Sem dependências complexas
 * 
 * POR QUÊ TypeScript para componente simples?
 * - Consistência: todos os componentes possuem tipos
 * - Extensibilidade: fácil adicionar props no futuro
 * - Documentação: FooterProps deixa claro o que é aceito
 * 
 * @component
 * @param {FooterProps} props - Props do Footer
 * @param {number} [props.year] - Ano para copyright (default: ano atual)
 * @param {string} [props.companyName] - Nome da empresa
 * @param {React.ReactNode} [props.children] - Conteúdo customizado
 * 
 * @example
 * // Uso simples
 * <Footer />
 * 
 * @example
 * // Uso customizado
 * <Footer year={2026} companyName="ImobSolo">
 *   <p>Todos os direitos reservados</p>
 * </Footer>
 */
const Footer: React.FC<FooterProps> = ({ 
  year = new Date().getFullYear(), 
  companyName = 'ImobSolo',
  children 
}) => {
  return (
    <footer className="main-footer">
      {children ? (
        children
      ) : (
        <p>© {year} {companyName} - Gestão Imobiliária Inteligente</p>
      )}
    </footer>
  );
};

export default Footer;
