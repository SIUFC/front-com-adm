
import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginAdm.css';

const LoginAdm = ({ onNavigateBack, onNavigateToAddQuestao }) => {
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
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token } = response.data;
      localStorage.setItem('authToken', token);

      // Decodifica o token para verificar o papel do usuário
      const decoded = jwtDecode(token);
      const userRole =
        decoded.role ||
        decoded.Role ||
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      console.log('Role do usuário:', userRole);

      if (userRole === 'Admin') {
        onNavigateToAddQuestao();
      } else {
        setError('ACESSO NEGADO: SOMENTE ADMINISTRADORES!');
      }
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
    <div className="adm-container">
      <header className="adm-header">
        <button onClick={onNavigateBack} className="seta-voltar">
          <FaArrowLeft /> Voltar
        </button>
      </header>

      <div className="login-container">
        <div className="login-box">
          <div className="login-adm-container">LOGIN ADM</div>
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
                <span
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon"
                >
                  {passwordShown ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdm;
