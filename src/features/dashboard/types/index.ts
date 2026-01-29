/**
 * TIPOS DO DASHBOARD
 * 
 * Tipos específicos para a feature Dashboard.
 * Usados pelos componentes e hooks da dashboard.
 * 
 * ESTRUTURA:
 * - DashboardCard: Card de métrica/KPI
 * - DashboardData: Dados completos do dashboard
 * - WelcomeMessage: Mensagem de boas-vindas customizada
 */

import { ReactNode } from 'react';

/**
 * Tipo: DashboardCard
 * 
 * Representa um card de métrica/KPI no dashboard.
 * Exibe dados como (exemplo): Imóveis (15), Leads (342), etc.
 * 
 * @typedef {Object} DashboardCard
 * @property {string} id - ID único do card
 * @property {string} titulo - Título do métrica (ex: "Imóveis Ativos")
 * @property {string | number} valor - Valor/número a exibir (ex: "15", "R$ 1.2M")
 * @property {IconType} icone - Ícone react-icons (ex: FiHome)
 * @property {'positiva' | 'neutra' | 'negativa'} tipo - Tipo para estilização
 * @property {string} [subtitulo] - Texto complementar (ex: "+5 este mês")
 * @property {string} [cor] - Cor customizada (hex ou rgb)
 * 
 * @example
 * const card: DashboardCard = {
 *   id: "imoveis",
 *   titulo: "Imóveis Ativos",
 *   valor: 15,
 *   icone: FiHome,
 *   tipo: "positiva",
 *   subtitulo: "+5 este mês"
 * };
 */
export interface DashboardCard {
  id: string;
  titulo: string;
  valor: string | number;
  icone: ReactNode;
  tipo: 'positiva' | 'neutra' | 'negativa';
  subtitulo?: string;
  cor?: string;
}

/**
 * Tipo: DashboardStats
 * 
 * Estatísticas resumidas do dashboard.
 * Dados agregados para exibição rápida.
 * 
 * @typedef {Object} DashboardStats
 * @property {number} imovelAtivos - Total de imóveis ativos
 * @property {number} leadsNovos - Leads novos este mês
 * @property {number} visitas - Visitas este mês
 * @property {number} conversao - Taxa de conversão (%)
 * @property {number} revenue - Receita total (R$)
 */
export interface DashboardStats {
  imovelAtivos: number;
  leadsNovos: number;
  visitas: number;
  conversao: number;
  revenue: number;
}

/**
 * Tipo: DashboardData
 * 
 * Dados completos para renderizar o dashboard.
 * Retornado pela hook useDashboardData.
 * 
 * @typedef {Object} DashboardData
 * @property {DashboardCard[]} cards - Array de cards de métrica
 * @property {DashboardStats} stats - Estatísticas resumidas
 * @property {string} periodo - Período dos dados (ex: "Janeiro 2024")
 * @property {Date} ultimaAtualizacao - Quando os dados foram atualizados
 */
export interface DashboardData {
  cards: DashboardCard[];
  stats: DashboardStats;
  periodo: string;
  ultimaAtualizacao: Date;
}

/**
 * Tipo: WelcomeMessage
 * 
 * Mensagem de boas-vindas customizada.
 * Varia conforme período do dia e dados do usuário.
 * 
 * @typedef {Object} WelcomeMessage
 * @property {string} saudacao - Saudação (ex: "Bom dia")
 * @property {string} mensagem - Mensagem completa
 * @property {'dia' | 'tarde' | 'noite'} periodo - Período do dia
 * 
 * @example
 * const msg: WelcomeMessage = {
 *   saudacao: "Bom dia",
 *   mensagem: "Bom dia, Thiago! Você tem 5 novos leads hoje.",
 *   periodo: "dia"
 * };
 */
export interface WelcomeMessage {
  saudacao: string;
  mensagem: string;
  periodo: 'dia' | 'tarde' | 'noite';
}
