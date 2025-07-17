import React from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import '../../Nivel.css'; 

const Fase = ({ onNavigateBack, onNavigateToPerfil, onNavigateToQuestao }) => {
  return (
    <div className="container">
      <header className="nivel-header">
        <button onClick={onNavigateBack} className="nav-button">
          <FaArrowLeft /> Voltar
        </button>
        <button onClick={onNavigateToPerfil} className="nav-button">
          <FaCog />
        </button>
      </header>

      <div className="title-bar">
        <h1>ESCOLHA A FASE</h1>
      </div>

      <main className="nivel-main">
        <button className="nivel-button">FASE 3</button>
        <button className="nivel-button">FASE 2</button>
        <button onClick={() => onNavigateToQuestao(1)} className="nivel-button">FASE 1</button>
      </main>
    </div>
  );
};

export default Fase;