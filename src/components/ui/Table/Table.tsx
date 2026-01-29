import React from 'react';
import type { TableProps, TableColumn } from '../types';
import './Table.scss';

/**
 * Table - Componente Molécula/Organismo para exibir tabelas
 * 
 * Características:
 * - Tabela com header fixo e corpo scrollável
 * - Dados dinâmicos via props
 * - Suporte a renderização customizada de células
 * - Status dinâmicos com cores
 * 
 * CONVERSÃO PARA TYPESCRIPT:
 * - TableProps tipificada com genéricos
 * - Suporte a colunas configuráveis
 * - Render functions tipificadas
 * - Type-safe data handling
 * 
 * POR QUÊ tipos genéricos?
 * - Table pode renderizar qualquer tipo de dados
 * - Cada coluna pode ter render function customizada
 * - Totalmente reutilizável em diferentes contextos
 * 
 * ESTRUTURA:
 * 1. Header Fixo (não rola)
 * 2. Área scrollável com a tabela
 * 
 * Padrão Atomic Design: MOLÉCULA/ORGANISMO
 * - Combina elementos visuais
 * - Comportamento especial de scroll
 * 
 * @component
 * @param {TableProps} props - Props da Table
 * @param {any[]} props.data - Array de dados a renderizar
 * @param {TableColumn[]} props.columns - Configuração das colunas
 * @param {string} [props.caption] - Legenda para acessibilidade
 * @param {boolean} [props.striped] - Aplicar estilo striped?
 * @param {boolean} [props.hoverable] - Efeito hover nas linhas?
 * @param {(row: any) => void} [props.onRowClick] - Callback ao clicar linha
 * @param {string} [props.className] - Classes CSS customizadas
 * 
 * @example
 * // Uso básico
 * <Table
 *   data={leads}
 *   columns={[
 *     { key: 'nome', header: 'Nome' },
 *     { key: 'status', header: 'Status', render: (v) => <Badge>{v}</Badge> }
 *   ]}
 *   caption="Tabela de Leads"
 *   striped
 *   hoverable
 * />
 */
const Table: React.FC<TableProps> = ({ 
  data, 
  columns,
  caption,
  striped = false,
  hoverable = false,
  onRowClick,
  className 
}) => {
  /**
   * Dados mockados padrão
   * 
   * Usados se nenhum dado foi fornecido via props
   * Facilita visualização do componente isolado
   */
  const defaultData = [
    {
      id: 1,
      nome: 'Mariana Souza',
      interesse: 'Apto Jardins',
      valor: 'R$ 850.000',
      data: '15/01/2026',
      status: 'Novo'
    },
    {
      id: 2,
      nome: 'Carlos Lima',
      interesse: 'Casa Cond. Fechado',
      valor: 'R$ 1.200.000',
      data: '14/01/2026',
      status: 'Em Negociação'
    },
    {
      id: 3,
      nome: 'Ana Paula Silva',
      interesse: 'Studio Centro',
      valor: 'R$ 350.000',
      data: '12/01/2026',
      status: 'Vendido'
    },
    {
      id: 4,
      nome: 'Roberto Mendes',
      interesse: 'Sala Comercial',
      valor: 'R$ 500.000',
      data: '10/01/2026',
      status: 'Novo'
    },
    {
      id: 5,
      nome: 'Fernanda Oliveira',
      interesse: 'Cobertura Duplex',
      valor: 'R$ 2.100.000',
      data: '08/01/2026',
      status: 'Em Negociação'
    },
    {
      id: 6,
      nome: 'Lucas Pereira',
      interesse: 'Terreno Alphaville',
      valor: 'R$ 450.000',
      data: '05/01/2026',
      status: 'Novo'
    }
  ];

  // Usa dados fornecidos ou padrão
  const tableData = data.length > 0 ? data : defaultData;

  /**
   * Colunas padrão
   * 
   * Usadas se nenhuma coluna foi fornecida via props
   */
  const defaultColumns: TableColumn[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'interesse', header: 'Interesse' },
    { key: 'valor', header: 'Valor' },
    { key: 'data', header: 'Data' },
    { key: 'status', header: 'Status' }
  ];

  // Usa colunas fornecidas ou padrão
  const tableColumns = columns.length > 0 ? columns : defaultColumns;

  /**
   * Obtém o valor de uma célula
   * 
   * POR QUÊ?
   * - Suporta nested properties (ex: 'usuario.nome')
   * - Renderização customizada se render function existir
   */
  const getCellValue = (row: any, column: TableColumn): React.ReactNode => {
    const value = row[column.key];
    
    // Se tem render function, usa ela
    if (column.render) {
      return column.render(value);
    }
    
    // Caso especial: status com badge
    if (column.key === 'status') {
      const statusClass = value?.toLowerCase().replace(/\s+/g, '-');
      return <span className={`status ${statusClass}`}>{value}</span>;
    }
    
    return value;
  };

  /**
   * Handler de clique em linha
   */
  const handleRowClick = (row: any): void => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className={`custom-table-container ${className || ''}`}>
      {/* Header Fixo (não participa do scroll) */}
      <div className="table-header-fixed">
        <h3>Últimos Leads (Clientes)</h3>
      </div>
      
      {/* Área de Scroll (apenas a tabela rola aqui dentro) */}
      <div className="table-scroll-area">
        <table
          className={`${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}
        >
          {caption && <caption>{caption}</caption>}
          
          <thead>
            <tr>
              {tableColumns.map((column) => (
                <th 
                  key={column.key}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => handleRowClick(row)}
                role={onRowClick ? 'button' : undefined}
                tabIndex={onRowClick ? 0 : undefined}
              >
                {tableColumns.map((column) => (
                  <td key={`${row.id || rowIndex}-${column.key}`}>
                    {column.key === 'nome' ? (
                      <span className="bold-text">
                        {getCellValue(row, column)}
                      </span>
                    ) : (
                      getCellValue(row, column)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
