// pages/AlterarNome.jsx

import React, { useState,useEffect, useRef } from 'react';
import './AlterarNome.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

export default function AlterarNome({ onNavigateBack }) {
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const notificationTimer = useRef(null);

    const showNotification = (message, type) => {
        clearTimeout(notificationTimer.current);
        setNotification({ message, type });
        notificationTimer.current = setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 4000);
    };
   
    useEffect(() => {
        return () => clearTimeout(notificationTimer.current);
    }, []);

    const handleConfirm = async () => {
        if (!newName.trim()) {
            setError('PREENCHA O CAMPO DE NOME');
            return;
        }
        setError('');

        // Pega o ID e o Token do localStorage
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');

        if (!userId || !token) {
            showNotification('Erro de autenticação. Faça login novamente.', 'error');
            return;
        }

        const url = `http://localhost:5037/api/User/${userId}/name`;
        const payload = { name: newName };

        try {
            
            await axios.put(url, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            showNotification('Nome alterado com sucesso!', 'success');
            
            
            setTimeout(() => {
                if (onNavigateBack) onNavigateBack();
            }, 2000);

        } catch (err) {
            console.error('Erro ao alterar nome:', err);
            showNotification('Não foi possível alterar o nome.', 'error');
        }
    };

    const handleBack = () => {
        if (onNavigateBack) onNavigateBack();
    };

    return (
        <div className="body-alterar-nome">

             
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            
            <div className="header-superior-an">
                <button className="voltar-an" onClick={handleBack}>
                            <FaArrowLeft /> Voltar
                           </button>
            </div>

            

            <div className="titulo-container-an">
                <div className="titulo-an">ALTERAR NOME</div>
            </div>

            <div className="container-an">
                <div className="form-grupo">
                    <label htmlFor="full-name" className="label-nome">Nome</label>
                    <input
                        type="text"
                        id="full-name"
                        className="input-nome"
                        placeholder="Nome completo"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    
                    {error && <p className="mensagem-erro">{error}</p>}
                </div>

                <button className="botao-confirmar" onClick={handleConfirm}>
                    Confirmar
                </button>
            </div>
        </div>
    );
}