import React from 'react';
import {
  MdOutlineHomeWork,
  MdOutlineGroup,
  MdOutlineAttachMoney,
  MdOutlineShowChart
} from 'react-icons/md';
import { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import type { DashboardCard, DashboardStats } from '../types';

/**
 * Tipo: DashboardDataReturn
 * 
 * Retorno do hook useDashboardData
 * 
 * @typedef {Object} DashboardDataReturn
 * @property {DashboardCard[]} dashboardCards - Array de cards de métricas
 * @property {(genero: string) => string} getWelcomeMessage - Função para gerar saudação
 * @property {DashboardStats} stats - Estatísticas agregadas
 */
export interface DashboardDataReturn {
  dashboardCards: DashboardCard[];
  getWelcomeMessage: (genero: string) => string;
  stats: DashboardStats;
}

/**
 * Hook: useDashboardData
 * 
 * Fornece todos os dados necessários para renderizar o dashboard.
 * Centraliza dados (mockados por enquanto, futuramente de API).
 * 
 * @returns {DashboardDataReturn} Objeto com dados do dashboard
 * 
 * @example
 * const { dashboardCards, getWelcomeMessage, stats } = useDashboardData();
 */
export const useDashboardData = (): DashboardDataReturn => {
  /**
   * Converter IconType para ReactNode
   * 
   * POR QUÊ?
   * - Card espera ReactNode (elemento JSX)
   * - IconType é função, precisa instanciar (<Icon />)
   * - Evita erro de tipo ao passar icone
   */
  const convertIcon = (Icon: IconType): ReactNode => React.createElement(Icon);

  /**
   * Dados dos cards de métricas
   * 
   * Cada card exibe um KPI (Key Performance Indicator):
   * - Imóveis cadastrados
   * - Clientes ativos
   * - Faturamento
   * - Taxa de conversão
   * 
   * FUTURO: Estes dados virão de uma API
   */
  const dashboardCards: DashboardCard[] = [
    {
      id: 'imoveis',
      titulo: 'Imóveis Cadastrados',
      valor: '124',
      icone: convertIcon(MdOutlineHomeWork),
      tipo: 'positiva',
      subtitulo: '+8 este mês'
    },
    {
      id: 'clientes',
      titulo: 'Clientes Ativos',
      valor: '8',
      icone: convertIcon(MdOutlineGroup),
      tipo: 'positiva',
      subtitulo: '+2 novos'
    },
    {
      id: 'faturamento',
      titulo: 'Faturamento Mensal',
      valor: 'R$ 12.500',
      icone: convertIcon(MdOutlineAttachMoney),
      tipo: 'neutra',
      subtitulo: '+15% vs. mês anterior'
    },
    {
      id: 'conversao',
      titulo: 'Taxa de Conversão',
      valor: '28%',
      icone: convertIcon(MdOutlineShowChart),
      tipo: 'negativa',
      subtitulo: '-3% vs. mês anterior'
    }
  ];

  /**
   * Estatísticas agregadas do dashboard
   * 
   * Dados consolidados para resumo executivo
   */
  const stats: DashboardStats = {
    imovelAtivos: 124,
    leadsNovos: 2,
    visitas: 342,
    conversao: 28,
    revenue: 12500
  };

  /**
   * Gera a frase de boas-vindas baseado no gênero do usuário
   * 
   * NOTA: Esta função recebe o gênero do usuário como parâmetro
   * para ser reutilizável em outros contextos
   * 
   * @param {string} genero - 'masculino', 'feminino' ou outro
   * @returns {string} Frase de boas-vindas personalizada
   */
  const getWelcomeMessage = (genero: string): string => {
    return genero === 'feminino'
      ? 'Seja bem-vinda de volta'
      : 'Seja bem-vindo de volta';
  };

  // Retorna um objeto com tudo que o componente precisa
  return {
    dashboardCards,
    getWelcomeMessage,
    stats
  };
};

export default useDashboardData;
