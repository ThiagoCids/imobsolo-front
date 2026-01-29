import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import logo from '../../assets/logo-imobsolo.png';
import type { FormData, FormError } from '../../types';
import './Register.scss';

/**
 * Register - Página de Cadastro
 * 
 * Responsabilidade:
 * - Coletar dados do novo usuário
 * - Validar formulário
 * - Enviar para API (futuramente)
 * - Mostrar sucesso e redirecionar
 * 
 * CONVERSÃO PARA TYPESCRIPT (FASE 5):
 * - Tipagem de useState hooks
 * - FormData e FormError types
 * - Type-safe event handlers
 * - React Router types
 * 
 * POR QUÊ?
 * - Validação em compile time
 * - TypeScript valida tipos automaticamente
 * - IDE oferece autocomplete
 * 
 * @component
 * @example
 * <Register />
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  
  /**
   * Estado do formulário de cadastro
   * 
   * Campos:
   * - name: nome completo do usuário
   * - email: email para login
   * - phone: telefone/WhatsApp
   * - password: senha
   * - confirmPassword: confirmação de senha
   */
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  /**
   * Estado de erros
   */
  const [errors, setErrors] = useState<FormError>({});

  /**
   * Estado de sucesso
   */
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  /**
   * Formatar número de telefone
   * 
   * POR QUÊ?
   * - UX melhorada: usuário vê formato conforme digita
   * - Validação facilitada
   * - Padrão brasileiro: (XX) XXXXX-XXXX
   * 
   * @param {string} value - Valor do input
   * @returns {string} Telefone formatado
   */
  const formatPhone = (value: string): string => {
    // Remove caracteres não-numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limit = numbers.slice(0, 11);
    
    // Aplica formato conforme o tamanho
    if (limit.length > 6) {
      return `(${limit.slice(0, 2)}) ${limit.slice(2, 7)}-${limit.slice(7)}`;
    } else if (limit.length > 2) {
      return `(${limit.slice(0, 2)}) ${limit.slice(2)}`;
    }
    return limit;
  };

  /**
   * Handler de mudança em inputs
   * 
   * POR QUÊ type-safe?
   * - Valida que name e value existem
   * - Formata telefone se necessário
   * - Limpa erros ao usuário digitar
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    
    // Aplicar formatação especial para telefone
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Limpar erro ao usuário começar a digitar
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  /**
   * Validar formulário antes de submeter
   * 
   * POR QUÊ?
   * - Feedback imediato
   * - Evita chamadas desnecessárias à API
   * - Valida regras de negócio
   */
  const validateForm = (): FormError => {
    const newErrors: FormError = {};

    // Validar nome
    if (!formData.name?.trim()) {
      newErrors.name = 'Nome completo é obrigatório';
    }

    // Validar email
    if (!formData.email?.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'E-mail inválido';
    }

    // Validar telefone
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Telefone obrigatório';
    } else if ((formData.phone as string).length < 14) {
      newErrors.phone = 'Número incompleto';
    }

    // Validar senha
    if (!formData.password || (formData.password as string).length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    // Validar confirmação
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    return newErrors;
  };

  /**
   * Handler de submissão do formulário
   * 
   * POR QUÊ?
   * - Valida antes de enviar
   * - Mostra sucesso e redireciona
   * - Futuramente: integrar com API
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors = validateForm();

    setErrors(newErrors);

    // Se não há erros, mostrar sucesso
    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
      
      // Redirecionar após 2.5 segundos
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        {/* Área da Logo */}
        <div className="logo-area">
          <img src={logo} alt="ImobSolo" />
        </div>

        {/* Exibir Sucesso ou Formulário */}
        {isSuccess ? (
          // Mensagem de Sucesso
          <div className="success-message">
            {/* Ícone vetorial no lugar do emoji */}
            <div className="icon-success">
              <FiCheckCircle />
            </div>
            <h2>Conta Criada!</h2>
            <p>Seus dados foram salvos com segurança.</p>
            <p className="redirect-text">Redirecionando para o login...</p>
          </div>
        ) : (
          <>
            {/* Cabeçalho */}
            <div className="header-text">
              <h2>Crie sua conta</h2>
              <p>Preencha os dados abaixo para começar.</p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Campo Nome */}
              <div className={`input-group ${errors.name ? 'error' : ''}`}>
                <label htmlFor="name">Nome Completo</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  placeholder="Ex: Thiago Domingues" 
                  value={formData.name || ''}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="msg-error">{errors.name}</span>}
              </div>

              {/* Linha com Email e Telefone */}
              <div className="form-row">
                {/* Campo Email */}
                <div className={`input-group ${errors.email ? 'error' : ''}`}>
                  <label htmlFor="email">E-mail</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email" 
                    placeholder="seu@email.com" 
                    value={formData.email || ''}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="msg-error">{errors.email}</span>}
                </div>

                {/* Campo Telefone */}
                <div className={`input-group ${errors.phone ? 'error' : ''}`}>
                  <label htmlFor="phone">Telefone / WhatsApp</label>
                  <input 
                    id="phone"
                    type="tel" 
                    name="phone" 
                    placeholder="(00) 00000-0000" 
                    value={formData.phone || ''}
                    onChange={handleChange}
                    maxLength={15}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="msg-error">{errors.phone}</span>}
                </div>
              </div>

              {/* Linha com Senha e Confirmação */}
              <div className="form-row">
                {/* Campo Senha */}
                <div className={`input-group ${errors.password ? 'error' : ''}`}>
                  <label htmlFor="password">Senha</label>
                  <input 
                    id="password"
                    type="password" 
                    name="password" 
                    placeholder="••••••"
                    value={formData.password || ''}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && <span className="msg-error">{errors.password}</span>}
                </div>

                {/* Campo Confirmar Senha */}
                <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
                  <label htmlFor="confirmPassword">Confirmar Senha</label>
                  <input 
                    id="confirmPassword"
                    type="password" 
                    name="confirmPassword" 
                    placeholder="••••••"
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && <span className="msg-error">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* Botão Cadastrar */}
              <button type="submit" className="btn-primary">
                Cadastrar
              </button>
            </form>

            {/* Links de Rodapé */}
            <div className="footer-links">
              <span>Já possui uma conta? </span>
              <Link to="/">Fazer Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
