import React, { useState } from 'react';
import axios from 'axios';

const QuizAnswerForm = () => {
  const [questionId, setQuestionId] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        'http://localhost:5037/api/Quiz/submit-answer',
        {
          questionId,
          submittedAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao enviar resposta.');
    }
  };

  return (
    <div>
      <h2>Responder Questão</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID da questão"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sua resposta"
          value={submittedAnswer}
          onChange={(e) => setSubmittedAnswer(e.target.value)}
        />
        <button type="submit">Enviar Resposta</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <p>{result.message}</p>
          <p>Total Correto: {result.totalCorrect}</p>
          <p>Total Incorreto: {result.totalIncorrect}</p>
        </div>
      )}
    </div>
  );
};

export default QuizAnswerForm;
