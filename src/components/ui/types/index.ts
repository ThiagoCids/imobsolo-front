/**
 * TIPOS DOS COMPONENTES UI
 * 
 * Tipos específicos para componentes de UI genéricos (Card, Table, etc)
 * Facilita tipagem de props dos componentes reutilizáveis.
 * 
 * ESTRUTURA:
 * - CardProps: Props do componente Card
 * - TableProps: Props do componente Table
 * - TableColumnProps: Configuração de coluna da tabela
 */

import type { ReactNode } from 'react';

/**
 * Tipo: CardVariant
 * 
 * Variantes visuais de um card
 */
export type CardVariant = 'positiva' | 'neutra' | 'negativa' | 'default' | 'success' | 'warning' | 'danger';

/**
 * Tipo: CardProps
 * 
 * Props do componente Card (métrica/KPI)
 * 
 * @typedef {Object} CardProps
 * @property {string} titulo - Título principal
 * @property {string | number} valor - Valor destaque
 * @property {ReactNode} icone - Ícone React
 * @property {CardVariant} [tipo] - Tipo visual para estilização
 * @property {string} [subtitulo] - Texto complementar
 * @property {() => void} [onClick] - Callback ao clicar
 * @property {string} [className] - Classes CSS customizadas
 */
export interface CardProps {
  titulo: string;
  valor: string | number;
  icone: ReactNode;
  tipo?: CardVariant;
  subtitulo?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Tipo: TableColumn
 * 
 * Configuração de uma coluna da tabela
 * 
 * @typedef {Object} TableColumn
 * @property {string} key - Identificador único da coluna
 * @property {string} header - Texto do cabeçalho
 * @property {string} [width] - Largura da coluna (CSS)
 * @property {boolean} [sortable] - Coluna pode ser ordenada?
 * @property {(value: any) => ReactNode} [render] - Função para renderizar célula customizada
 */
export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any) => ReactNode;
}

/**
 * Tipo: TableProps
 * 
 * Props do componente Table
 * 
 * @typedef {Object} TableProps
 * @property {any[]} data - Array de dados a exibir
 * @property {TableColumn[]} columns - Configuração das colunas
 * @property {string} [caption] - Legenda da tabela (acessibilidade)
 * @property {boolean} [striped] - Linhas alternadas?
 * @property {boolean} [hoverable] - Efeito hover nas linhas?
 * @property {(row: any) => void} [onRowClick] - Callback ao clicar em linha
 * @property {string} [className] - Classes CSS customizadas
 */
export interface TableProps {
  data: any[];
  columns: TableColumn[];
  caption?: string;
  striped?: boolean;
  hoverable?: boolean;
  onRowClick?: (row: any) => void;
  className?: string;
}
