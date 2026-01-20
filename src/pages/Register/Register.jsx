import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// IMPORTAÇÃO NOVA: Ícone de Check Profissional
import { FiCheckCircle } from 'react-icons/fi'; 
import logo from '../../assets/logo-imobsolo.png'; 
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    const limit = numbers.slice(0, 11);
    if (limit.length > 6) return `(${limit.slice(0, 2)}) ${limit.slice(2, 7)}-${limit.slice(7)}`;
    else if (limit.length > 2) return `(${limit.slice(0, 2)}) ${limit.slice(2)}`;
    return limit;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') setFormData({ ...formData, phone: formatPhone(value) });
    else setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Nome completo é obrigatório";
    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    else if (!formData.email.includes('@')) newErrors.email = "E-mail inválido";
    if (!formData.phone) newErrors.phone = "Telefone obrigatório";
    else if (formData.phone.length < 14) newErrors.phone = "Número incompleto";
    if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
      setTimeout(() => { navigate('/'); }, 2500); // Aumentei um pouco para dar tempo de ver o check
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        <div className="logo-area">
            <img src={logo} alt="ImobSolo" />
        </div>

        {isSuccess ? (
          // --- ÁREA DE SUCESSO CORRIGIDA ---
          <div className="success-message">
            {/* Ícone vetorial no lugar do emoji */}
            <div className="icon-success">
              <FiCheckCircle />
            </div>
            <h2>Conta Criada!</h2>
            <p>Seus dados foram salvos com segurança.</p>
            <p className="redirect-text">Redirecionando para o login...</p>
          </div>
          // ---------------------------------
        ) : (
          <>
            <div className="header-text">
              <h2>Crie sua conta</h2>
              <p>Preencha os dados abaixo para começar.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className={`input-group ${errors.name ? 'error' : ''}`}>
                <label>Nome Completo</label>
                <input type="text" name="name" placeholder="Ex: Thiago Domingues" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="msg-error">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className={`input-group ${errors.email ? 'error' : ''}`}>
                  <label>E-mail</label>
                  <input type="email" name="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} />
                  {errors.email && <span className="msg-error">{errors.email}</span>}
                </div>
                <div className={`input-group ${errors.phone ? 'error' : ''}`}>
                  <label>Telefone / WhatsApp</label>
                  <input type="tel" name="phone" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} maxLength="15" />
                  {errors.phone && <span className="msg-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`input-group ${errors.password ? 'error' : ''}`}>
                  <label>Senha</label>
                  <input type="password" name="password" placeholder="******" value={formData.password} onChange={handleChange} />
                  {errors.password && <span className="msg-error">{errors.password}</span>}
                </div>
                <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
                  <label>Confirmar Senha</label>
                  <input type="password" name="confirmPassword" placeholder="******" value={formData.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <span className="msg-error">{errors.confirmPassword}</span>}
                </div>
              </div>

              <button type="submit" className="btn-primary">Cadastrar</button>
            </form>

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