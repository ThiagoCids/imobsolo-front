import React from 'react';
import { FiEdit3, FiMaximize2 } from 'react-icons/fi';
import type { PropertyCardProps } from '../types/index';
import './PropertyCard.scss';

/**
 * PropertyCard - Componente Card específico da Feature de Imóveis
 * 
 * Responsabilidade:
 * - Exibir visualmente os dados de UM imóvel
 * - Mostrar status, preço, características e ações
 * - Ser reutilizável em diferentes contextos (lista, grid, etc)
 * 
 * CONVERSÃO PARA TYPESCRIPT:
 * - PropertyCardProps com tipagem de Property ou dados mockados
 * - Callbacks tipificados para editar/deletar
 * - Type-safe data access
 * - Melhor documentação automática
 * 
 * POR QUÊ usar PropertyCardProps type?
 * - Garante que dados necessários estão presentes
 * - IDEs oferecem autocomplete para properties
 * - Erros detectados em compile time
 * - Flexível para property (backend) ou data (mock)
 * 
 * Padrão Atomic Design: MOLÉCULA
 * - Combina vários elementos visuais
 * - Sem lógica de negócio complexa
 * - Apenas recebe dados e exibe
 * 
 * ACESSIBILIDADE:
 * - Utiliza tags semânticas (<article>, <header>, <footer>)
 * - Textos descritivos em aria-labels
 * - Emojis com aria-label para leitores de tela
 * 
 * @component
 * @param {PropertyCardProps} props - Props do PropertyCard
 * @param {Property | any} [props.property] - Dados completos do imóvel (backend)
 * @param {any} [props.data] - Dados mockados do imóvel (listagem)
 * @param {() => void} [props.onEdit] - Callback ao clicarem em editar
 * @param {() => void} [props.onDelete] - Callback ao deletarem
 * @param {() => void} [props.onPreview] - Callback ao visualizarem
 * @param {boolean} [props.isSelected] - Se está selecionado (multi-select)
 * @param {string} [props.className] - Classes CSS customizadas
 * 
 * @example
 * // Uso com dados mockados
 * <PropertyCard 
 *   data={imovel}
 *   onEdit={handleEdit}
 *   onPreview={handlePreview}
 * />
 * 
 * // Uso com dados completos (backend)
 * <PropertyCard 
 *   property={imovelCompleto}
 *   onEdit={handleEdit}
 * />
 */
const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  data,
  onEdit,
  onPreview,
  isSelected = false,
  className
}) => {
  // POR QUÊ coalesce (||)?
  // - Suportar tanto 'property' (backend) quanto 'data' (mock)
  // - Componente é reutilizável em diferentes contextos
  // - Dados de mock podem estar em 'data', dados reais em 'property'
  const imovel = property || data;

  if (!imovel) {
    return null; // Não renderizar se não tem dados
  }
  /**
   * Formata o texto do status para exibição
   * Converte 'ativo' em 'Ativo', 'vendido' em 'Vendido', etc
   * 
   * POR QUÊ extrair em função?
   * - Reutilizável em outros componentes
   * - Fácil manter lista de status
   * - Mudanças centralizadas
   * 
   * @param {string} status - Status bruto do banco de dados
   * @returns {string} Status formatado para exibição
   */
  const formatStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      ativo: 'Ativo',
      vendido: 'Vendido',
      alugado: 'Alugado',
      indisponivel: 'Indisponível',
      destaque: 'Destaque'
    };
    return statusMap[status] || status;
  };

  /**
   * Handlers de clique dos botões
   */
  const handleDetailsClick = (): void => {
    if (onPreview) {
      onPreview();
    }
  };

  const handleEditClick = (): void => {
    if (onEdit) {
      onEdit();
    }
  };

  if (!property) {
    return null; // Retorna nulo se `property` não estiver definido
  }

  return (
    // SEMÂNTICA: <article> indica que este card é um conteúdo independente.
    // Pode ser removido daqui e colocado em outro contexto, ainda faz sentido sozinho.
    <article 
      className={`property-card ${isSelected ? 'selected' : ''} ${className || ''}`}
      role="region"
      aria-label={`Card do imóvel ${property.titulo}`}
    >
      
      {/* SEMÂNTICA: <header> agrupa a imagem e o status */}
      <header className="card-image-container">
        <img 
          src={property.imagem} 
          alt={`Foto principal de ${property.titulo}`} 
          className="property-image"
        />
        {/* Badge dinâmica: cor muda conforme o status */}
        <span className={`status-badge ${property.status}`}>
          {formatStatus(property.status)}
        </span>
      </header>

      {/* Corpo do Cartão */}
      <div className="card-body">
        
        {/* Informações Principais: Preço, Título e Endereço */}
        <div className="main-info">
           {/* Preço em destaque (mais importante) */}
           <strong className="price">{property.preco.toLocaleString('pt-BR', {
             style: 'currency',
             currency: 'BRL'
           })}</strong>
           <h3 className="title" title={property.titulo}>{property.titulo}</h3>
           <p className="address">{property.endereco}</p>
        </div>

        {/* SEMÂNTICA: Características são uma LISTA de elementos.
            Usado <ul> e <li> mantendo estrutura semântica correta */}
        <ul className="features-list">
          {/* Iterate through characteristics */}
          {property.caracteristicas.map((feature: any) => (
            <li 
              key={feature.label}
              title={feature.label}
            >
              <span role="img" aria-label={feature.label}>
                {feature.emoji || '📦'}
              </span> 
              {feature.value}
            </li>
          ))}
        </ul>

        {/* SEMÂNTICA: <footer> agrupa as ações finais do card */}
        <footer className="card-actions">
          <button 
            className="btn-details"
            onClick={handleDetailsClick}
            type="button"
            aria-label={`Ver detalhes de ${property.titulo}`}
          >
            <FiMaximize2 /> Ver Detalhes
          </button>
          <button 
            className="btn-edit" 
            aria-label="Editar Imóvel"
            onClick={handleEditClick}
            type="button"
          >
            <FiEdit3 />
          </button>
        </footer>

      </div>
    </article>
  );
};

export default PropertyCard;
