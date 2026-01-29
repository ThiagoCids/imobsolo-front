import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { AuthContextType } from '../context/AuthContext';

/**
 * useAuth - Hook customizado para acessar contexto de autenticação
 * 
 * RESPONSABILIDADE:
 * - Extrair contexto de autenticação
 * - Validar se dentro de AuthProvider
 * - Retornar typed context
 * 
 * POR QUÊ um hook customizado?
 * - Evita repetir useContext(AuthContext) em cada componente
 * - Centraliza validação de provider
 * - Oferece erro claro se esqueceu Provider
 * - Facilita migrar para zustand/redux depois
 * 
 * PADRÃO:
 * ```
 * const { user, login, logout } = useAuth();
 * ```
 * 
 * NÃO FAZER:
 * ```
 * const auth = useContext(AuthContext); // ❌ Sem validação
 * ```
 * 
 * @returns {AuthContextType} Contexto de autenticação tipado
 * @throws {Error} Se usado fora de AuthProvider
 * 
 * @example
 * const Dashboard = () => {
 *   const { user, isLoading } = useAuth();
 *   return <h1>Bem-vindo, {user?.nome}</h1>;
 * };
 */
export const useAuth = (): AuthContextType => {
  /**
   * Extrair contexto do React
   * 
   * useContext retorna:
   * - AuthContextType: Se dentro de AuthProvider ✅
   * - undefined: Se fora de AuthProvider ❌
   */
  const context = useContext(AuthContext);
  
  /**
   * Validar se está dentro de AuthProvider
   * 
   * POR QUÊ?
   * - Erro claro no console
   * - Facilita debugging
   * - Evita undefined errors confusos depois
   * 
   * MENSAGEM:
   * - Indica qual hook foi usado
   * - Aponta que precisa de Provider
   * - Ajuda desenvolvedor a corrigir rápido
   */
  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de um <AuthProvider>. ' +
      'Verifique se seu componente está envolvido por AuthProvider em main.jsx'
    );
  }
  
  /**
   * Retornar contexto tipado
   * 
   * TypeScript garante que:
   * - Todos os campos de AuthContextType estão presentes
   * - IDE oferece autocomplete
   * - Refatorações seguras (renomear quebra build)
   */
  return context;
};

export default useAuth;
