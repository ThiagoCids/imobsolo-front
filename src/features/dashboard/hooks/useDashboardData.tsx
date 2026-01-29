import React, { ReactNode } from 'react';
import { MdOutlineAttachMoney, MdOutlineGroup, MdOutlineHomeWork, MdOutlineShowChart } from 'react-icons/md';
import { DashboardCard, DashboardStats } from '../types';
import { IconType } from 'react-icons';

export const useDashboardData = () => {
  /**
   * Converter IconType para ReactNode
   * 
   * POR QUÊ?
   * - Card espera ReactNode (elemento JSX)
   * - IconType é função, precisa instanciar (<Icon />)
   * - Evita erro de tipo ao passar ícone
   */
  const convertIcon = (Icon: IconType): ReactNode => React.createElement(Icon);

  /**
   * Mock de dados para cards do dashboard
   */
  const dashboardCards: DashboardCard[] = [
    {
      id: 'imoveis',
      titulo: 'Imóveis',
      valor: 120,
      icone: convertIcon(MdOutlineHomeWork),
      tipo: 'positiva',
    },
    {
      id: 'clientes',
      titulo: 'Clientes',
      valor: 45,
      icone: convertIcon(MdOutlineGroup),
      tipo: 'neutra',
    },
    {
      id: 'faturamento',
      titulo: 'Faturamento',
      valor: 15000,
      icone: convertIcon(MdOutlineAttachMoney),
      tipo: 'positiva',
    },
    {
      id: 'crescimento',
      titulo: 'Crescimento',
      valor: '12%',
      icone: convertIcon(MdOutlineShowChart),
      tipo: 'positiva',
    },
  ];

  /**
   * Mock de estatísticas agregadas
   */
  const stats: DashboardStats = {
    imovelAtivos: 120,
    leadsNovos: 45,
    visitas: 300,
    conversao: 12,
    revenue: 15000,
  };

  return { dashboardCards, stats };
};