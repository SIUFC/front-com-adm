import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizReport = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5037/api/Quiz/report', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReport(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Erro ao buscar relatório.');
      }
    };

    fetchReport();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return report ? (
    <div>
      <h2>Relatório do Usuário</h2>
      <p>Total de Questões: {report.totalQuestions}</p>
      <p>Corretas: {report.totalCorrect}</p>
      <p>Incorretas: {report.totalIncorrect}</p>
      <p>Nível 1: {report.level1Count}</p>
      <p>Nível 2: {report.level2Count}</p>
      <p>Nível 3: {report.level3Count}</p>
      <p>{report.message}</p>
    </div>
  ) : (
    <p>Carregando relatório...</p>
  );
};

export default QuizReport;
