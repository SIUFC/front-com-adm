import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import './Cadastro.css';

const Cadastro = ({ onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCadastro = async (event) => {
    event.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('POR FAVOR, PREENCHA TODOS OS CAMPOS');
      return;
    }

    if (password.length < 8) {
      setError('SUA SENHA DEVE TER NO MÍNIMO 8 CARACTERES');
      return;
    }

    if (password !== confirmPassword) {
      setError('AS SENHAS NÃO COINCIDEM');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        Name: name,
        Email: email,
        Password: password,
      };

      const response = await axios.post('http://localhost:5037/api/User', userData);

      console.log('USUÁRIO CADASTRADO', response.data.message);
      onNavigateToLogin();

    } catch (err) {
      console.error('ERRO::', err);

      if (err.response && err.response.status === 409) {
        setError('ESSE E-MAIL JÁ ESTÁ VINCULADO A UMA CONTA');
      }
      else if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      }
      else {
        setError('Ocorreu um erro ao tentar cadastrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <header className="cadastro-header">
        <button onClick={onNavigateToLogin} className="back-button">
          <FaArrowLeft /> Voltar
        </button>
        <div className="title-bar">
          <h1>CADASTRE-SE</h1>
        </div>
      </header>

      <main className="cadastro-main">
        <form className="cadastro-form" onSubmit={handleCadastro}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <span onClick={() => setPasswordShown(!passwordShown)} className="password-toggle-icon">
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">Confirmar senha</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                id="confirm-password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <span onClick={() => setConfirmPasswordShown(!confirmPasswordShown)} className="password-toggle-icon">
                {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="cadastro-button" disabled={loading}>
          Cadastrar
           </button>
        </form>
      </main>
    </div>
  );
};

export default Cadastro;