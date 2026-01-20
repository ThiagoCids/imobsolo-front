import React, { useState } from 'react';
// Hooks de navegação do React Router
import { Link, useNavigate } from 'react-router-dom';
// Ícone de alerta para erros
import { FiAlertCircle } from 'react-icons/fi';
// Estilos e Logo
import './Login.scss';
import logo from '../../assets/logo-imobsolo.png'; 

const Login = () => {
  // Hook para redirecionar o usuário (ex: ir para o dashboard)
  const navigate = useNavigate();
  
  // ESTADOS (Memória do Componente)
  // Guardam o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para as mensagens de erro (inicialmente vazios)
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Função auxiliar: Verifica se o texto tem formato de e-mail (tem @ e ponto)
  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // FUNÇÃO DE LOGIN (Disparada ao clicar em Entrar)
  const handleLogin = (e) => {
    e.preventDefault(); // Impede a página de recarregar (comportamento padrão do HTML)

    // 1. Limpa erros antigos para fazer uma nova verificação limpa
    setEmailError('');
    setPasswordError('');
    let isValid = true; // Variável de controle (flag)

    // 2. Validação do Campo E-mail
    if (!email) {
      setEmailError('Por favor, digite seu e-mail.');
      isValid = false;
    } else if (!isEmailValid(email)) {
      setEmailError('O e-mail digitado é inválido.');
      isValid = false;
    }

    // 3. Validação do Campo Senha
    if (!password) {
      setPasswordError('Digite sua senha para continuar.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres.');
      isValid = false;
    }

    // 4. Se passou por todas as verificações (isValid continua true)
    if (isValid) {
      console.log("Login autorizado:", email);
      navigate('/dashboard'); // Manda para a próxima tela
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Cabeçalho com Logo */}
        <div className="brand-area">
          <img src={logo} alt="ImobSolo Logo" className="logo" />
          <h2>Bem-vindo de volta</h2>
          <p>Insira seus dados para acessar o ImobSolo.</p>
        </div>

        {/* Formulário de Login */}
        {/* noValidate: Desliga os balões de erro nativos do navegador */}
        <form onSubmit={handleLogin} noValidate>
          
          {/* GRUPO: EMAIL */}
          {/* Adiciona classe CSS 'has-error' se houver erro neste campo */}
          <div className={`input-group ${emailError ? 'has-error' : ''}`}>
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              placeholder="exemplo@imobsolo.com" 
              value={email}
              // onChange: Atualiza o estado quando o usuário digita
              onChange={(e) => {
                setEmail(e.target.value);
                if(emailError) setEmailError(''); // Limpa o erro assim que o usuário começa a corrigir
              }}
            />
            {/* Renderização Condicional: Só mostra a mensagem se emailError existir */}
            {emailError && (
              <span className="error-message">
                <FiAlertCircle /> {emailError}
              </span>
            )}
          </div>

          {/* GRUPO: SENHA */}
          <div className={`input-group ${passwordError ? 'has-error' : ''}`}>
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="********" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if(passwordError) setPasswordError('');
              }}
            />
            {passwordError && (
              <span className="error-message">
                <FiAlertCircle /> {passwordError}
              </span>
            )}
          </div>

          {/* Link de Esqueci Senha */}
          <div className="actions">
            <Link to="/recuperar-senha" class="forgot-link">Esqueceu a senha?</Link>
          </div>

          {/* Botão Principal */}
          <button type="submit" className="btn-primary">Entrar</button>

          {/* Rodapé do Form: Cadastro */}
          <div className="register-area">
            <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
          </div>
        </form>
      </div>
      
      {/* Rodapé da Página */}
      <div className="footer-credits">
        © 2024 ImobSolo CRM. Todos os direitos reservados.
      </div>
    </div>
  );
};

export default Login;