import React from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import '../Nivel.css';

const Ano = ({ onNavigateBack, onNavigateToPerfil, onNavigateToFase }) => {
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
        <h1>SELECIONE O ANO</h1>
      </div>

      <main className="nivel-main">
        <button onClick={onNavigateToFase} className="nivel-button">2021</button>
        <button className="nivel-button">2020</button>
        <button className="nivel-button">2019</button>
        <button className="nivel-button">2018</button>
      </main>
    </div>
  );
};

export default Ano;