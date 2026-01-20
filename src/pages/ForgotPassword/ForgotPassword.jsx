import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiMail, FiAlertCircle } from 'react-icons/fi';
import './ForgotPassword.scss';
import logo from '../../assets/logo-imobsolo.png'; 

const ForgotPassword = () => {
  // Estado do campo de email
  const [email, setEmail] = useState('');
  
  // Estado que controla QUAL TELA mostrar (Formulário ou Sucesso)
  const [isSent, setIsSent] = useState(false);
  
  // Estado de erro
  const [error, setError] = useState('');

  // Validação simples de regex
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!email) {
      setError('Por favor, digite seu e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Insira um endereço de e-mail válido.');
      return;
    }

    // Simula envio para API com delay de 0.5 segundos
    setTimeout(() => {
      setIsSent(true); // Troca a tela para "Sucesso"
    }, 500);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        
        {/* LÓGICA CONDICIONAL */}
        {/* Se NÃO foi enviado (!isSent), mostra o formulário */}
        {!isSent ? (
          <>
            {/* Botão de Voltar */}
            <div className="header-nav">
              <Link to="/" className="back-link">
                <FiArrowLeft /> Voltar
              </Link>
            </div>
            
            <div className="brand-area">
              <img src={logo} alt="ImobSolo Logo" className="logo" />
              <h2>Recuperar Senha</h2>
              <p>Digite seu e-mail para receber as instruções.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className={`input-group ${error ? 'has-error' : ''}`}>
                <label htmlFor="email">E-mail Cadastrado</label>
                
                {/* Wrapper para posicionar o ícone dentro do input */}
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="voce@exemplo.com" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if(error) setError('');
                    }}
                  />
                </div>
                {error && (
                  <span className="error-message">
                    <FiAlertCircle /> {error}
                  </span>
                )}
              </div>

              {/* Botão de Envio (Usa a classe .btn-primary global do card) */}
              <button type="submit" className="btn-primary">
                Enviar Link de Recuperação
              </button>
            </form>
          </>
        ) : (
          // CASO CONTRÁRIO (Se isSent for true), mostra tela de Sucesso
          <div className="success-state">
            <FiCheckCircle className="success-icon" />
            <h2>E-mail Enviado!</h2>
            <p>Verifique sua caixa de entrada em <strong>{email}</strong>.</p>
            
            {/* Botão de Voltar ao Login */}
            {/* Importante: Usa a MESMA classe .btn-primary para manter consistência visual (azul sólido) */}
            <Link to="/" className="btn-primary">
              Voltar ao Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;