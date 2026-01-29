/**
 * TIPOS DA FEATURE PROPERTIES (Imóveis)
 * 
 * Tipos específicos para a feature Properties.
 * Usados pelo componente PropertyCard e listagem de imóveis.
 * 
 * ESTRUTURA:
 * - Property: Dados de um imóvel
 * - PropertyFeature: Característica do imóvel (quartos, banheiros, etc)
 * - PropertyStatus: Status de listagem
 * - PropertyCardProps: Props do componente PropertyCard
 */

/**
 * Tipo: PropertyFeature
 * 
 * Característica individual de um imóvel.
 * Pode ser "Quartos", "Banheiros", "Garagem", etc.
 * 
 * @typedef {Object} PropertyFeature
 * @property {string} label - Nome da característica (ex: "Quartos")
 * @property {string | number} value - Valor (ex: "3", "2.5")
 * @property {string} [emoji] - Emoji para visualização (ex: "🛏️")
 * 
 * @example
 * const feature: PropertyFeature = {
 *   label: "Quartos",
 *   value: 3,
 *   emoji: "🛏️"
 * };
 */
export interface PropertyFeature {
  label: string;
  value: string | number;
  emoji?: string;
}

/**
 * Tipo: PropertyStatus
 * 
 * Status de um imóvel no sistema.
 * Define como exibir visualmente (cores, badges).
 */
export type PropertyStatus = 'ativo' | 'vendido' | 'alugado' | 'indisponivel' | 'destaque';

/**
 * Tipo: Property
 * 
 * Dados completos de um imóvel.
 * Representa um imóvel no banco de dados.
 * 
 * @typedef {Object} Property
 * @property {string} id - ID único do imóvel
 * @property {string} titulo - Título do anúncio
 * @property {string} descricao - Descrição detalhada
 * @property {string} endereco - Endereço completo
 * @property {number} preco - Preço em reais
 * @property {number} area - Área em m²
 * @property {string} imagem - URL da imagem principal
 * @property {string[]} [galeria] - URLs de imagens adicionais
 * @property {PropertyFeature[]} caracteristicas - Quartos, banheiros, etc
 * @property {PropertyStatus} status - Status do imóvel
 * @property {Date} dataCriacao - Quando foi cadastrado
 * @property {string} corretor - ID do corretor responsável
 * 
 * @example
 * const property: Property = {
 *   id: "imv_001",
 *   titulo: "Casa com Piscina - Zona Sul",
 *   descricao: "Casa moderna...",
 *   endereco: "Rua A, 123 - São Paulo",
 *   preco: 750000,
 *   area: 250,
 *   imagem: "https://...",
 *   caracteristicas: [
 *     { label: "Quartos", value: 3, emoji: "🛏️" }
 *   ],
 *   status: "ativo"
 * };
 */
export interface Property {
  id: string;
  titulo: string;
  descricao: string;
  endereco: string;
  preco: number;
  area: number;
  imagem: string;
  galeria?: string[];
  caracteristicas: PropertyFeature[];
  status: PropertyStatus;
  dataCriacao: Date;
  corretor: string;
}

/**
 * Tipo: PropertyCardProps
 * 
 * Props do componente PropertyCard.
 * Define que dados o componente recebe.
 * 
 * Suporta dois formatos:
 * 1. property (Property) - Dados completos do backend
 * 2. data (PropertyMock) - Dados mockados em listagem
 * 
 * @typedef {Object} PropertyCardProps
 * @property {Property | any} property - Dados do imóvel (formato completo)
 * @property {any} [data] - Dados mockados alternativos
 * @property {() => void} [onEdit] - Callback quando clica editar
 * @property {() => void} [onDelete] - Callback quando clica deletar
 * @property {() => void} [onPreview] - Callback quando clica ver detalhes
 * @property {boolean} [isSelected] - Se está selecionado (multi-select)
 * @property {string} [className] - Classes CSS customizadas
 */
export interface PropertyCardProps {
  property?: Property;
  data?: any; // Dados mockados com estrutura diferente
  onEdit?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
  isSelected?: boolean;
  className?: string;
}

/**
 * Tipo: PropertyFilter
 * 
 * Filtros para busca de imóveis.
 * Usado em páginas de listagem.
 * 
 * @typedef {Object} PropertyFilter
 * @property {number} [precoMin] - Preço mínimo
 * @property {number} [precoMax] - Preço máximo
 * @property {number} [areaMin] - Área mínima
 * @property {number} [areaMax] - Área máxima
 * @property {PropertyStatus[]} [status] - Filtrar por status
 * @property {string} [busca] - Texto de busca no título/descrição
 */
export interface PropertyFilter {
  precoMin?: number;
  precoMax?: number;
  areaMin?: number;
  areaMax?: number;
  status?: PropertyStatus[];
  busca?: string;
}
