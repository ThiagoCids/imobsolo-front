/**
 * Index de Tipos Globais
 * 
 * Centraliza as exportações de tipos reutilizáveis em toda a aplicação
 */

export * from './common';
export * from './forms';
export * from './auth';

// Re-exporta tipos de layout para conveniência
export type { MenuItem, HeaderProps, SidebarProps, FooterProps } from '../components/layout/types';

// Re-exporta tipos de properties
export type { Property, PropertyStatus, PropertyCardProps, PropertyFeature } from '../features/properties/types';
