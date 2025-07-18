import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import logo from './obi-simulator-logo.png';

const Login = ({ onNavigateToCadastro, onNavigateToNivel, onNavigateToLoginAdm }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !senha) {
      setError('PREENCHA OS CAMPOS DE E-MAIL E SENHA!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5037/Login/login',
        {
          Email: email,
          Password: senha,
          Role: 'User', 
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login bem-sucedido:', response.data);
      const { token } = response.data;
      localStorage.setItem('authToken', token);

      onNavigateToNivel();
    } catch (err) {
      console.error('Erro no login:', err);
      if (err.response) {
        setError(err.response.data?.error || 'E-MAIL OU SENHA INVÁLIDOS');
      } else if (err.request) {
        setError('NÃO FOI POSSÍVEL SE CONECTAR AO SERVIDOR. VERIFIQUE SUA CONEXÃO.');
      } else {
        setError('ERRO INESPERADO. TENTE NOVAMENTE...');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="OBI Simulator Logo" className="logo" />
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="password-wrapper">
              <input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={loading}
              />
              <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="signup-link">
          <button onClick={onNavigateToCadastro} className="link-button" disabled={loading}>
            Cadastre-se
          </button>
        </div>
      </div>
      
      <button onClick={onNavigateToLoginAdm} className="admin-button" disabled={loading}>
        Admin
      </button>
    </div>
  );
};

export default Login;