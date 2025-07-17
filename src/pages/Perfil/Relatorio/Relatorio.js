// pages/Relatorio.jsx

import React from 'react';
import './Relatorio.css'; 
import { FaArrowLeft } from 'react-icons/fa';

export default function Relatorio({ onNavigateBack }) {
    // Dados do relatório (simulando dados vindos de uma API)
    const dadosRelatorio = [
        { label: 'Total de questões', value: 0 },
        { label: 'Total de acertos', value: 0 },
        { label: 'Total de erros', value: 0 },
        { label: 'Questões feitas (Nível 2)', value: 0 },
        { label: 'Questões feitas (Nível 1)', value: 0 },
        { label: 'Questões feitas (Nível Jr)', value: 0 },
    ];

    const handleVoltar = () => {
        if (onNavigateBack) onNavigateBack();
    };

    return (
        <div className="body-relatorio">
            {/* Header */}
            
            <div className="header-superior-r">
                       <button className="voltar-r" onClick={handleVoltar}>
                        <FaArrowLeft /> Voltar
                       </button>
                       </div>
                       
            {/* Título */}
            <div className="titulo-container-r">
                <div className="titulo-r">RELATÓRIO</div>
            </div>

            {/* Conteúdo Principal */}
            <div className="container-r">
                {dadosRelatorio.map((item, index) => (
                    <div className="relatorio-item" key={index}>
                        <span className="relatorio-label">{item.label}</span>
                        <span className="relatorio-value">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}