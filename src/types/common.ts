/**
 * TIPOS GLOBAIS E BASE - Reutilizáveis em toda a aplicação
 * 
 * Este arquivo centraliza tipos que são compartilhados entre features
 * para evitar duplicação e manter consistência de tipos.
 * 
 * ESTRUTURA:
 * - User: Usuário autenticado
 * - ApiResponse: Resposta padrão de API
 * - Nullable: Tipo auxiliar para valores opcionais
 * 
 * POR QUÊ tipos globais?
 * - Evita repetição de código
 * - Garante consistência
 * - Facilita manutenção
 * - Central para documentação
 */

/**
 * Tipo: User
 * 
 * Representa um usuário autenticado no sistema.
 * Vem do contexto de autenticação (AuthContext).
 * 
 * @typedef {Object} User
 * @property {string} id - ID único do usuário
 * @property {string} email - Email do usuário
 * @property {string} nome - Nome completo
 * @property {'masculino' | 'feminino'} genero - Gênero do usuário
 * @property {string} avatar - Primeira letra do nome (ex: "T" para "Thiago")
 * @property {string} role - Papel do usuário (ex: "corretor", "admin")
 */
export interface User {
  id: string;
  email: string;
  nome: string;
  genero: 'masculino' | 'feminino' | string;
  avatar: string;
  role: string;
}

/**
 * Tipo: ApiResponse
 * 
 * Resposta padrão de qualquer endpoint de API.
 * Facilita tipagem consistente de respostas.
 * 
 * @template T - Tipo dos dados na resposta
 * 
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Se a requisição foi bem-sucedida
 * @property {T} data - Dados da resposta
 * @property {string} [message] - Mensagem opcional
 * @property {string} [error] - Mensagem de erro (se houver)
 * 
 * @example
 * const response: ApiResponse<User> = {
 *   success: true,
 *   data: { ... },
 *   message: "Usuário autenticado"
 * };
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Tipo: Nullable<T>
 * 
 * Auxiliar para valores que podem ser null ou undefined.
 * Reduz a necessidade de usar "T | null | undefined" repetidamente.
 * 
 * @template T - Tipo do valor
 * 
 * @example
 * type OptionalUser = Nullable<User>;
 */
export type Nullable<T> = T | null | undefined;

/**
 * Tipo: Optional<T>
 * 
 * Auxiliar para propriedades opcionais.
 * Torna todas as propriedades de um objeto opcionais.
 * 
 * @template T - Tipo do objeto
 * 
 * @example
 * type PartialUser = Optional<User>;
 */
export type Optional<T> = Partial<T>;

/**
 * Tipo: AsyncFunction
 * 
 * Função assíncrona genérica que retorna um resultado.
 * Útil para tipificar funções de API.
 * 
 * @template T - Tipo do retorno
 * 
 * @example
 * const fetchUser: AsyncFunction<User> = async () => { ... };
 */
export type AsyncFunction<T> = (...args: any[]) => Promise<T>;

/**
 * Tipo: LoadingState
 * 
 * Estados padrão de carregamento em requisições.
 * Usado em hooks que fazem chamadas de API.
 * 
 * @typedef {Object} LoadingState
 * @property {boolean} isLoading - Está carregando?
 * @property {boolean} isSuccess - Sucesso?
 * @property {boolean} isError - Erro?
 * @property {string} [error] - Mensagem de erro
 */
export interface LoadingState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
}
