/**
 * TIPOS PARA AUTENTICAÇÃO
 * 
 * Tipos específicos para o contexto e hooks de autenticação.
 * 
 * ESTRUTURA:
 * - AuthContextType: Tipo do contexto de autenticação
 * - LoginCredentials: Credenciais para login
 * - RegisterData: Dados para registro
 */

import type { User } from '../types/common';

/**
 * Tipo: LoginCredentials
 * 
 * Credenciais necessárias para fazer login
 * 
 * @typedef {Object} LoginCredentials
 * @property {string} email - Email do usuário
 * @property {string} password - Senha do usuário
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Tipo: RegisterData
 * 
 * Dados necessários para registrar novo usuário
 * 
 * @typedef {Object} RegisterData
 * @property {string} email - Email do usuário
 * @property {string} password - Senha do usuário
 * @property {string} confirmPassword - Confirmação de senha
 * @property {string} nome - Nome completo
 * @property {'masculino' | 'feminino'} genero - Gênero
 */
export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  nome: string;
  genero: 'masculino' | 'feminino' | string;
}

/**
 * Tipo: AuthContextType
 * 
 * Interface do contexto de autenticação
 * Define que métodos e propriedades estão disponíveis
 * 
 * @typedef {Object} AuthContextType
 * @property {User | null} user - Usuário autenticado (null se não autenticado)
 * @property {boolean} isLoading - Carregando dados?
 * @property {string | null} error - Mensagem de erro (se houver)
 * @property {(credentials: LoginCredentials) => Promise<void>} login - Fazer login
 * @property {(data: RegisterData) => Promise<void>} register - Registrar novo usuário
 * @property {() => void} logout - Fazer logout
 * @property {() => void} clearError - Limpar mensagem de erro
 */
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
