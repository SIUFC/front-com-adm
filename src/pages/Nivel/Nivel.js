import React from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import './Nivel.css';

const Nivel = ({ onNavigateToBack, onNavigateToPerfil, onNavigateToAno }) => {
  return (
    <div className="container">
      <header className="nivel-header">
        <button onClick={onNavigateToBack} className="nav-button">
          <FaArrowLeft /> Voltar
        </button>
        <button onClick={onNavigateToPerfil} className="nav-button">
          <FaCog />
        </button>
      </header>

      <div className="title-bar">
        <h1>SELECIONE O NÍVEL</h1>
      </div>

      <main className="nivel-main">
        <button className="nivel-button">Nível 2</button>
        <button className="nivel-button">Nível 1</button>
        <button onClick={onNavigateToAno} className="nivel-button">Nível Júnior</button>
      </main>
    </div>
  );
};

export default Nivel;