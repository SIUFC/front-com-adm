import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AlterarSenha.css';
import { FaArrowLeft } from 'react-icons/fa';

const EyeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeSlashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);


export default function AlterarSenha({ onNavigateBack }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    
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
        const newErrors = {};
        if (newPassword.length < 8) {
            newErrors.newPassword = 'A SENHA DEVE TER NO MÍNIMO 8 DÍGITOS';
        }
        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'AS SENHAS NÃO COINCIDEM';
        }
        
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');

        if (!userId || !token) {
            showNotification('Erro de autenticação. Faça login novamente.', 'error');
            return;
        }

        const url = `http://localhost:5037/api/User/${userId}/password`;
        const payload = { NewPassword: newPassword };

        try {
            await axios.put(url, payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            showNotification('Senha alterada com sucesso!', 'success');
            
            setTimeout(() => {
                if (onNavigateBack) onNavigateBack();
            }, 2000);

        } catch (err) {
            console.error('Erro ao alterar senha:', err);
            showNotification('Não foi possível alterar a senha.', 'error');
        }
    };

    const handleBack = () => {
        if (onNavigateBack) onNavigateBack();
    };

    return (
        <div className="body-alterar-senha">
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
            <div className="titulo-container-as">
                <div className="titulo-as">ALTERAR SENHA</div>
            </div>

            <div className="container-as">
                <div className="form-grupo-as">
                    <label className="label-senha">Nova senha</label>
                    <div className="input-container">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            className="input-senha"
                            placeholder="Nova senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                           {showNewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </span>
                    </div>
                    {errors.newPassword && <p className="mensagem-erro">{errors.newPassword}</p>}
                </div>

                <div className="form-grupo-as">
                    <label className="label-senha">Confirmar senha</label>
                    <div className="input-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="input-senha"
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                           {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="mensagem-erro">{errors.confirmPassword}</p>}
                </div>

                <button className="botao-confirmar-as" onClick={handleConfirm}>
                    Confirmar
                </button>
            </div>
        </div>
    );
}