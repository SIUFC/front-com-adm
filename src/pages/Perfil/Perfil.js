// pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Perfil.css';
import { FaArrowLeft } from 'react-icons/fa';

export default function Perfil({ onNavigateToAlterarNome, onNavigateToAlterarSenha, onNavigateToRelatorio, onNavigateBack,onNavigateToLogin  }) {

    const [user, setUser] = useState({
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError('');
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('authToken');
                console.log('userId:', userId);
                console.log('token:', token);
                const response = await axios.get(
                    `http://localhost:5037/api/User/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setUser({
                    name: response.data.name,
                    email: response.data.email
                });
            } catch (err) {
                console.error(err); // Veja o erro completo no console
                setError('Erro ao buscar usuário');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

       const handleLogout = () => {
        // Limpa os dados do usuário do navegador
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');

        // Chama a função que te leva direto para a tela de login
        if (onNavigateToLogin) {
            onNavigateToLogin();
        }
    };

    const goToChangeName = () => onNavigateToAlterarNome && onNavigateToAlterarNome();
    const goToChangePassword = () => onNavigateToAlterarSenha && onNavigateToAlterarSenha();
    const goToReport = () => onNavigateToRelatorio && onNavigateToRelatorio();
    const handleBack = () => onNavigateBack && onNavigateBack();

    return (
        <div className="body">
            <div className="header-superior">
         <button className="voltar" onClick={handleBack}>
        <FaArrowLeft /> Voltar
        </button>
</div>

            <div className="titulo-container">
                <div className="titulo">PERFIL</div>
            </div>
            
            <div className="container">
                {loading ? (
                    <div>Carregando...</div>
                ) : error ? (
                    <div className="mensagem-erro">{error}</div>
                ) : (
                    <>
                        <div className="nome">{user.name}</div>
                        <div className="email">{user.email}</div>
                        <div className="botoes">
                            <button onClick={goToChangeName}>Alterar nome</button>
                            <button onClick={goToChangePassword}>Alterar senha</button>
                            <button onClick={goToReport}>Relatório</button>
                            <button onClick={handleLogout}>Sair</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}