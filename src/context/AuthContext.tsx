import React, { 
  ReactNode, 
  useState, 
  useEffect, 
  useCallback, 
  createContext 
} from 'react';

/**
 * AuthContext - Gerencia estado global de autenticação
 * 
 * SIMULADO: No momento, usa localStorage para simular um backend
 * FUTURO: Integrar com API real quando backend estiver pronto
 */

// Definição de tipos para o contexto
export interface User {
  id: string;
  email: string;
  nome: string;
  genero: string;
  avatar: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  clearError: () => void;
}

/**
 * Criar contexto com type-safe default
 * 
 * POR QUÊ undefined?
 * - Força uso de useAuth() hook ou Consumer pattern
 * - Previne acessos diretos sem verificação
 * - IDE avisa se esquecer Provider
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props do AuthProvider
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Componente que fornece contexto de autenticação
 * 
 * FUNCIONALIDADES:
 * 1. Carrega usuário do localStorage ao iniciar
 * 2. Fornece métodos de login/logout
 * 3. Rastreia estado de loading e erros
 * 4. Persiste dados no localStorage
 * 
 * POR QUÊ?
 * - Autenticação persiste entre reloads
 * - Mantém estado sincronizado
 * - Permite reconexão automática
 * 
 * FUTURO:
 * - Substituir localStorage por sessões HTTP-only
 * - Integrar com API real
 * - Adicionar refresh token
 * 
 * @component
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  /**
   * Estado do usuário autenticado
   * 
   * null: Não autenticado
   * User: Dados do usuário logado
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * Estado de carregamento
   * 
   * true: Buscando dados
   * false: Pronto para usar
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Estado de erro
   * 
   * null: Sem erros
   * string: Mensagem de erro
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Efeito: Carregar usuário do localStorage ao montar
   * 
   * POR QUÊ?
   * - Restaura sessão anterior
   * - Evita perder autenticação ao recarregar página
   * - Dependency array vazio = executa 1x ao montar
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        // Parse JSON armazenado
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        // Erro ao parsear = dados corrompidos = limpar
        console.error('Erro ao carregar usuário:', err);
        setError('Erro ao carregar dados do usuário');
        localStorage.removeItem('user');
      }
    }
    
    // Marcar como pronto independente de sucesso/erro
    setIsLoading(false);
  }, []);

  /**
   * Login - Autenticar usuário com email e senha
   * 
   * FLUXO:
   * 1. Validar inputs
   * 2. Simular chamada à API (1.5s)
   * 3. Salvar no estado + localStorage
   * 4. Retornar sucesso/erro
   * 
   * POR QUÊ useCallback?
   * - Previne recriação da função a cada render
   * - Evita re-renders desnecessários em componentes que usam
   * - Permite usar em dependency arrays seguramente
   * 
   * POR QUÊ async?
   * - Simula delay de rede
   * - Futuramente: esperar resposta da API
   * - Permite usar await em componentes
   * 
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise} Objeto com sucesso e erro opcional
   */
  const login = useCallback(async (
    email: string, 
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validar inputs
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      // TODO: Substituir por chamada real à API
      // const response = await apiService.login(email, password);
      // const userData = response.data;

      // Simular delay de rede (1.5s)
      // POR QUÊ?
      // - Oferece feedback UX realista
      // - Testa comportamento de loading
      // - Facilita testar spinner UI
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simular resposta da API
      // NOTA: Em produção, vem do servidor
      const userData: User = {
        id: '123',
        email,
        nome: 'Thiago Henrique Domingues',
        genero: 'masculino',
        avatar: 'TD',
        role: 'corretor'
      };

      // Atualizar estado
      setUser(userData);
      
      // Persistir em localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (err) {
      // Extrair mensagem de erro
      const errorMsg = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      // Sempre marcar como não carregando
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout - Desautenticar usuário
   * 
   * FLUXO:
   * 1. Limpar estado local
   * 2. Remover do localStorage
   * 3. Limpar erros
   * 
   * POR QUÊ useCallback?
   * - Evita recriação desnecessária
   * - Seguro para colocar em dependency arrays
   */
  const logout = useCallback((): void => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  }, []);

  /**
   * UpdateUser - Atualizar dados do usuário
   * 
   * FLUXO:
   * 1. Mesclar dados novos com existentes
   * 2. Atualizar estado
   * 3. Persistir em localStorage
   * 
   * POR QUÊ Partial<User>?
   * - Permite atualizar apenas alguns campos
   * - Não precisa passar todos os campos
   * - Exemplo: updateUser({ avatar: 'novo' })
   * 
   * @param {Partial<User>} updatedData - Campos a atualizar
   */
  const updateUser = useCallback((updatedData: Partial<User>): void => {
    if (!user) return; // Não fazer nada se sem usuário
    
    const newUser: User = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }, [user]);

  /**
   * ClearError - Limpar mensagem de erro
   * 
   * POR QUÊ?
   * - Permite descartar erro sem logout
   * - Reintentar ação após erro
   */
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  /**
   * Objeto de valor do contexto
   * 
   * CAMPOS:
   * - user: Dados do usuário (null se não autenticado)
   * - isLoading: Indica se está buscando dados
   * - error: Mensagem de erro (null se sem erro)
   * - isAuthenticated: Boolean derivado (!!user)
   * - login: Função de autenticação
   * - logout: Função de desautenticação
   * - updateUser: Função para atualizar dados
   * - clearError: Função para limpar erro
   * 
   * POR QUÊ satisfies?
   * - Valida que value implementa AuthContextType
   * - IDE oferece autocomplete melhor
   * - TypeScript detecta campos faltantes
   */
  const value: AuthContextType = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
