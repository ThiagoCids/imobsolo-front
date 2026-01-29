/**
 * CONSTANTES GLOBAIS
 * 
 * Valores constantes usados em toda a aplicação.
 * TypeScript garante que não sejam modificadas acidentalmente.
 * 
 * ESTRUTURA:
 * - API_CONFIG: Configurações de API
 * - RESPONSIVE_BREAKPOINTS: Breakpoints para media queries
 * - MENU_ITEMS: Itens padrão do menu
 * - PROPERTY_STATUS: Status possíveis de um imóvel
 */

import type { MenuItem } from '../components/layout/types';
import type { PropertyStatus } from '../features/properties/types';

/**
 * Configurações de API
 * 
 * URLs e timeouts para chamadas HTTP
 * 
 * POR QUÊ usar (import.meta.env as any)?
 * import.meta é padrão do ES modules (suportado por Vite)
 * Casting 'as any' evita erro TypeScript com variáveis de ambiente
 */
export const API_CONFIG = {
  BASE_URL: (globalThis as any).import?.meta?.env?.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3,
} as const;

/**
 * Breakpoints responsivos
 * 
 * Pontos de quebra para CSS media queries
 */
export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1440,
} as const;

/**
 * Itens padrão do menu de navegação
 */
export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: undefined // Será adicionado dinamicamente
  },
  {
    id: 'properties',
    label: 'Imóveis',
    path: '/properties',
    icon: undefined
  },
  {
    id: 'leads',
    label: 'Leads',
    path: '/leads',
    icon: undefined
  },
  {
    id: 'settings',
    label: 'Configurações',
    path: '/settings',
    icon: undefined
  }
];

/**
 * Status possíveis de um imóvel
 * 
 * Usado para validação e estilização
 */
export const PROPERTY_STATUS_OPTIONS: PropertyStatus[] = [
  'ativo',
  'vendido',
  'alugado',
  'indisponivel',
  'destaque'
];

/**
 * Mapeamento de status para cores (CSS)
 */
export const PROPERTY_STATUS_COLORS: Record<PropertyStatus, string> = {
  'ativo': '#10b981',       // Verde
  'vendido': '#6366f1',     // Índigo
  'alugado': '#3b82f6',     // Azul
  'indisponivel': '#9ca3af', // Cinza
  'destaque': '#f59e0b'     // Âmbar
} as const;

/**
 * Períodos de validação
 */
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\d{10}|\d{11})$/,
} as const;

/**
 * Cores tema
 */
export const THEME_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  LIGHT: '#f3f4f6',
  DARK: '#1f2937',
} as const;

/**
 * Tempo de exibição de notificações (ms)
 */
export const NOTIFICATION_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;
