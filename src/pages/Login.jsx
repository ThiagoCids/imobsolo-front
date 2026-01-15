import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-imobsolo.png'
import './Login.scss' // <--- Importando nosso estilo novo

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="ImobSolo" style={{ width: '160px', marginBottom: '30px' }} />
        
        <h2 style={{ marginBottom: '10px', color: '#2B3674', fontSize: '24px' }}>Acesse sua Conta</h2>
        <p style={{ color: '#A3AED0', marginBottom: '30px', fontSize: '14px' }}>Digite seu e-mail e senha para entrar</p>
        
        <div className="input-group">
          <label>E-mail</label>
          <input type="email" placeholder="mail@imobsolo.com" />
        </div>
        
        <div className="input-group">
          <label>Senha</label>
          <input type="password" placeholder="********" />
        </div>

        <div style={{ textAlign: 'right', marginBottom: '25px' }}>
          <span style={{ color: '#4318FF', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>
            Esqueceu a senha?
          </span>
        </div>
        
        {/* Aqui está a classe btn-entrar que criamos com os efeitos */}
        <button onClick={handleLogin} className="btn-entrar">
          Entrar
        </button>

        <div style={{ fontSize: '14px', color: '#A3AED0' }}>
          Não tem uma conta? <span className="link-texto">Cadastre-se</span>
        </div>

      </div>
    </div>
  )
}

export default Login