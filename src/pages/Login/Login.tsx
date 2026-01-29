import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import logo from '../../assets/logo-imobsolo.png';
import type { FormData, FormError } from '../../types';
import './Login.scss';

/**
 * Login - Página de Autenticação
 * 
 * Responsabilidade:
 * - Coletar credenciais do usuário
 * - Validar dados do formulário
 * - Chamar login via useAuth hook
 * - Redirecionar para dashboard após sucesso
 * 
 * CONVERSÃO PARA TYPESCRIPT (FASE 5):
 * - Tipagem de useState hooks
 * - FormData e FormError types
 * - Type-safe event handlers
 * - React Router types
 * 
 * POR QUÊ não usar useFormValidation hook?
 * - Login tem lógica específica (toggle password, etc)
 * - Função simples, hook não é necessário
 * - Mantém componente auto-contido
 * 
 * @component
 * @example
 * <Login />
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, error: authError, isLoading } = useAuth();

  /**
   * Estado do formulário
   * 
   * POR QUÊ tipificado?
   * - TypeScript valida email e password
   * - IDE oferece autocomplete
   */
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  /**
   * Estado de erros
   * 
   * Record<string, string> permite erros para qualquer campo
   */
  const [errors, setErrors] = useState<FormError>({});

  /**
   * Mostrar/ocultar senha
   */
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /**
   * Handler de mudança em inputs
   * 
   * POR QUÊ type-safe?
   * - event.target tipificado como HTMLInputElement
   * - name e value validados
   * - Erros detectados em compile time
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro ao usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Validar formulário antes de submeter
   * 
   * POR QUÊ?
   * - Feedback imediato ao usuário
   * - Evita chamadas desnecessárias à API
   * - Validação em tempo de compilação com tipos
   * 
   * @returns {FormError} Objeto com erros encontrados
   */
  const validateForm = (): FormError => {
    const newErrors: FormError = {};

    // Validar email
    if (!formData.email?.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email as string)) {
      newErrors.email = 'Email inválido';
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if ((formData.password as string).length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    return newErrors;
  };

  /**
   * Handler de submissão do formulário
   * 
   * POR QUÊ async?
   * - login é uma função assíncrona
   * - Aguarda autenticação antes de redirecionar
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const newErrors = validateForm();

    // Se há erros, exibir e não submeter
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Tentar fazer login
    await login(formData.email as string, formData.password as string);
    
    // Se sucesso, redirecionar (login hook atualiza contexto)
    // Se erro, erro já está em authError do context
    setTimeout(() => {
      if (!authError) {
        navigate('/dashboard');
      }
    }, 500);
  };

  return (
    <div className="login-container">
      {/* Background com gradientes */}
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      {/* Card de Login */}
      <div className="login-card">
        {/* Área da Logo */}
        <div className="logo-area">
          <img src={logo} alt="ImobSolo" className="logo" />
        </div>

        {/* Textos de Cabeçalho */}
        <div className="header-text">
          <h1>Bem-vindo de volta</h1>
          <p>Insira seus dados para acessar o ImobSolo</p>
        </div>

        {/* Alert de Erro Global */}
        {authError && (
          <div className="error-alert" role="alert">
            <FiAlertCircle size={20} />
            <span>{authError}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Campo E-mail */}
          <div className={`input-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email || ''}
              onChange={handleChange}
              autoComplete="email"
              disabled={isLoading}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span className="error-message" id="email-error">
                <FiAlertCircle size={14} />
                {errors.email}
              </span>
            )}
          </div>

          {/* Campo Senha */}
          <div className={`input-group ${errors.password ? 'has-error' : ''}`}>
            <div className="label-row">
              <label htmlFor="password">Senha</label>
              <Link to="/recuperar-senha" className="forgot-link">
                Esqueceu a senha?
              </Link>
            </div>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password || ''}
                onChange={handleChange}
                autoComplete="current-password"
                disabled={isLoading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {errors.password && (
              <span className="error-message" id="password-error">
                <FiAlertCircle size={14} />
                {errors.password}
              </span>
            )}
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="btn-login"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        {/* Link para Cadastro */}
        <div className="auth-footer">
          <p>
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="link-register">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
