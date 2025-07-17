import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Nivel from './pages/Nivel/Nivel';
import Ano from './pages/Nivel/Junior/Ano';
import Fase from './pages/Nivel/Junior/2021/Fase';
import Questao from './pages/Nivel/Junior/2021/Questões/Questao';
import Perfil from './pages/Perfil/Perfil';
import AlterarNome from './pages/Perfil/AlterarNome/AlterarNome';
import AlterarSenha from './pages/Perfil/AlterarSenha/AlterarSenha';
import Relatorio from './pages/Perfil/Relatorio/Relatorio';
import LoginAdm from './pages/Adm/LoginAdm'; 
import AddQuestao from './pages/Adm/AddQuestao';
import CriarQuestao from './pages/Adm/CriarQuestao';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const navigateToCadastro = () => setCurrentScreen('cadastro');
  const navigateToLogin = () => setCurrentScreen('login');
  const navigateToNivel = () => setCurrentScreen('nivel');
  const navigateToAno = () => setCurrentScreen('ano');
  const navigateToFase = () => setCurrentScreen('fase');
  const navigateToQuestao = () => setCurrentScreen('questao');
  const navigateToPerfil = () => setCurrentScreen('perfil');
  const navigateToAlterarNome = () => setCurrentScreen('alterarNome');
  const navigateToAlterarSenha = () => setCurrentScreen('alterarSenha');
  const navigateToRelatorio = () => setCurrentScreen('relatorio');
  const navigateToLoginAdm = () => setCurrentScreen('loginAdm');
  const navigateToAddQuestao = () => setCurrentScreen ('addQuestao');
  const navigateToCriarQuestao = () => setCurrentScreen ('criarQuestao');


  const renderScreen = () => {
    switch (currentScreen) {
      case 'cadastro':
        return <Cadastro onNavigateToLogin={navigateToLogin} />;

      case 'nivel':
        return (
          <Nivel
            onNavigateBack={() => setCurrentScreen('login')}
            onNavigateToAno={navigateToAno}
            onNavigateToPerfil={navigateToPerfil}
          />
        );

      case 'ano':
        return (
          <Ano
            onNavigateBack={() => setCurrentScreen('nivel')}
            onNavigateToFase={navigateToFase}
            onNavigateToPerfil={navigateToPerfil}
          />
        );

      case 'fase':
        return (
          <Fase
            onNavigateBack={() => setCurrentScreen('ano')}
            onNavigateToPerfil={navigateToPerfil}
            onNavigateToQuestao={navigateToQuestao}
          />
        );

      case 'perfil':
        return (
          <Perfil
            onNavigateToAlterarNome={navigateToAlterarNome}
            onNavigateToAlterarSenha={navigateToAlterarSenha}
            onNavigateToRelatorio={navigateToRelatorio}
            onNavigateBack={() => setCurrentScreen('fase')}
          />
        );

      case 'alterarNome':
        return (
          <AlterarNome
            onNavigateBack={navigateToPerfil}
          />
        );

      case 'alterarSenha':
        return (
          <AlterarSenha
            onNavigateBack={navigateToPerfil}
          />
        );

      case 'relatorio':
        return (
          <Relatorio
            onNavigateBack={navigateToPerfil}
          />
        );

      case 'questao':
        return (
          <Questao 
            onNavigateBack={() => setCurrentScreen('fase')}
            onNavigateToPerfil={navigateToPerfil}
          />
        );
      
      // Novo case para a tela de login do Admin
      case 'loginAdm':
        return (
          <LoginAdm 
            onNavigateBack={() => setCurrentScreen('login')}
	          onNavigateToAddQuestao={navigateToAddQuestao}
          />
        );

      case 'addQuestao':
        return (
          <AddQuestao 
            onNavigateBack={navigateToLoginAdm}
            onNavigateToCriarQuestao={navigateToCriarQuestao}
          />
        );

      case 'criarQuestao':
        return (
          <CriarQuestao
            onNavigateBack={navigateToAddQuestao}
          />
        );

      case 'login':
      default:
        return (
          <Login
            onNavigateToCadastro={navigateToCadastro}
            onNavigateToNivel={navigateToNivel}
            onNavigateToLoginAdm={navigateToLoginAdm}
          />
        );
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;