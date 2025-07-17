import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './CriarQuestao.css';

const CriarQuestao = ({ filtros = {}, onNavigateBack }) => {
  const [texto, setTexto] = useState('');
  const [enunciado, setEnunciado] = useState('');
  const [alternativaA, setAlternativaA] = useState('');
  const [alternativaB, setAlternativaB] = useState('');
  const [alternativaC, setAlternativaC] = useState('');
  const [alternativaD, setAlternativaD] = useState('');
  const [alternativaE, setAlternativaE] = useState('');
  const [respostaCorreta, setRespostaCorreta] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleAdicionarQuestao = async (event) => {
    event.preventDefault(); 
    setFeedback({ message: '', type: '' });

    if (!respostaCorreta) {
      setFeedback({ message: 'SELECIONE O GABARITO DA QUESTÃO', type: 'error' });
      return;
    }

    setLoading(true);

    const questaoParaAPI = {
      Name: `N${filtros.nivel}_A${filtros.ano}_F${filtros.fase}_Q${filtros.numQuestao}`,
      
      Level: filtros.nivel,
      Year: parseInt(filtros.ano, 10),
      Content: JSON.stringify({
          textoApoio: texto,
          enunciado: enunciado,
          alternativas: [
              { letra: 'A', texto: alternativaA },
              { letra: 'B', texto: alternativaB },
              { letra: 'C', texto: alternativaC },
              { letra: 'D', texto: alternativaD },
              { letra: 'E', texto: alternativaE },
          ]
      }),
      CorrectAnswer: respostaCorreta,
    };

    try {
      await axios.post('https://localhost:5037/api/Question/create', questaoParaAPI);
      
      setFeedback({ message: 'Questão adicionada', type: 'success' });
      
      setTexto('');
      setEnunciado('');
      setAlternativaA('');
      setAlternativaB('');
      setAlternativaC('');
      setAlternativaD('');
      setAlternativaE('');
      setRespostaCorreta('');

    } catch (err) {
      console.error("ERRO AO ADICIONAR QUESTÃO:", err);
      let errorMessage = 'FALHA AO ADICIONAR. TENTE NOVAMENTE';
      if (err.response) {
        if (err.response.status === 401) {
            errorMessage = 'ACESSO NEGADO';
        } else if (err.response.data?.message) {
            errorMessage = err.response.data.message;
        }
      }
      setFeedback({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pagina-container"> 
      <button onClick={onNavigateBack} className="back-button">
        <FaArrowLeft /> Voltar
      </button>
      
      <form className="cadastro-form" onSubmit={handleAdicionarQuestao}>
        <div className="input-group">
          <label htmlFor="texto">Texto vinculado a questão</label>
          <textarea
            id="texto"
            rows="5"
            placeholder="Era uma vez..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            disabled={loading}
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="enunciado">Enunciado da Questão</label>
          <textarea
            id="enunciado"
            rows="3"
            placeholder="Qual das alternativas abaixo está correta?"
            value={enunciado}
            onChange={(e) => setEnunciado(e.target.value)}
            disabled={loading}
            required
          ></textarea>
        </div>
        
        <hr />
        <p><strong>ALTERNATIVAS</strong> (Selecione a correta)</p>
        
        {['A', 'B', 'C', 'D', 'E'].map(letra => (
          <div className="input-group-alternativa" key={letra}>
            <input 
              type="radio" 
              id={`radio-${letra}`} 
              name="respostaCorreta" 
              value={letra} 
              checked={respostaCorreta === letra}
              onChange={(e) => setRespostaCorreta(e.target.value)}
              disabled={loading}
            />
            <label htmlFor={`alt-${letra}`} className="alternativa-label">{letra}</label>
            <input 
              type="text" 
              id={`alt-${letra}`} 
              value={
                letra === 'A' ? alternativaA :
                letra === 'B' ? alternativaB :
                letra === 'C' ? alternativaC :
                letra === 'D' ? alternativaD : alternativaE
              } 
              onChange={(e) => {
                if (letra === 'A') setAlternativaA(e.target.value);
                if (letra === 'B') setAlternativaB(e.target.value);
                if (letra === 'C') setAlternativaC(e.target.value);
                if (letra === 'D') setAlternativaD(e.target.value);
                if (letra === 'E') setAlternativaE(e.target.value);
              }} 
              disabled={loading} 
              required 
            />
          </div>
        ))}

        {feedback.message && (
          <p className={feedback.type === 'error' ? 'error-message' : 'success-message'}>
            {feedback.message}
          </p>
        )}
        
        <button type="submit" className="nivel-button" disabled={loading}>
            Adicionar
        </button>
      </form>
    </div>
  );
};

export default CriarQuestao;