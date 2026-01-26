import React, { useState, useEffect, useCallback, createContext } from 'react';

export const AuthContext = createContext();

/**
 * AuthContext - Gerencia estado global de autenticação
 * 
 * SIMULADO: No momento, usa localStorage para simular um backend
 * FUTURO: Integrar com API real quando backend estiver pronto
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simular carregamento do usuário ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Erro ao carregar usuário:', err);
        setError('Erro ao carregar dados do usuário');
      }
    }
    setIsLoading(false);
  }, []);

  // Login com validação básica
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Substituir por chamada real à API
      // const response = await apiService.login(email, password);
      
      // Simulação - Remove antes de usar em produção
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      // Simula delay de rede (1.5s)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simula resposta da API
      const userData = {
        id: '123',
        email,
        nome: 'Thiago Henrique Domingues',
        genero: 'masculino',
        avatar: 'TD',
        role: 'corretor'
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Erro ao fazer login';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  }, []);

  // Atualizar dados do usuário
  const updateUser = useCallback((updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }, [user]);

  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
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
