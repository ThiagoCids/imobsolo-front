import React, { useState } from 'react';
// Importamos o Link para ir ao cadastro e useNavigate para ir ao Dashboard
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-imobsolo.png';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate(); // Inicializa o GPS

  // Estado dos dados
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Estado dos erros
  const [errors, setErrors] = useState({});
  // Estado para mostrar que está "carregando"
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // 1. Validação simples
    if (!formData.email) {
      newErrors.email = "Digite seu e-mail";
    } else if (!formData.email.includes('@')) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Digite sua senha";
    }

    setErrors(newErrors);

    // 2. Se não tem erros, faz o Login!
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true); // Ativa o spinner no botão

      // Simula uma espera de 1.5 segundos (como se fosse no banco de dados)
      setTimeout(() => {
        // AQUI ESTÁ A MÁGICA: Redireciona para o Dashboard
        navigate('/dashboard'); 
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-area">
          <img src={logo} alt="ImobSolo" />
        </div>

        <div className="header-text">
          <h2>Bem-vindo de volta</h2>
          <p>Insira seus dados para acessar o ImobSolo.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Campo E-mail */}
          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <label>E-mail</label>
            <input 
              type="email" 
              name="email" 
              placeholder="exemplo@imobsolo.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="msg-error">{errors.email}</span>}
          </div>

          {/* Campo Senha */}
          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <div className="label-row">
              <label>Senha</label>
            </div>
            <input 
              type="password" 
              name="password" 
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Link de Esqueci Senha alinhado à direita */}
            <div className="forgot-password-link">
               <Link to="/recuperar-senha">Esqueceu a senha?</Link>
            </div>
            
            {errors.password && <span className="msg-error">{errors.password}</span>}
          </div>

          {/* Botão Entrar com efeito de Carregamento */}
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="footer-links">
          <span>Não tem uma conta? </span>
          <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;