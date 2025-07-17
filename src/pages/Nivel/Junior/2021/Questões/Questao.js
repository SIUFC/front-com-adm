import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import './Questao.css'; 

const Questao = ({ onNavigateBack, onNavigateToPerfil }) => {
  const [listaNomesQuestoes, setListaNomesQuestoes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  const [dadosQuestao, setDadosQuestao] = useState(null);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
  const [respostaRevelada, setRespostaRevelada] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListaDeNomes = async () => {
      try {
        const response = await axios.get('https://localhost:5037/api/Question/all-names');
        if (response.data && response.data.length > 0) {
          setListaNomesQuestoes(response.data);
        } else {
          setError("Nenhuma questão encontrada para o quiz.");
        }
      } catch (err) {
        console.error("Erro ao buscar lista de questões:", err);
        setError("Não foi possível iniciar o quiz. Verifique a conexão com a API.");
      }
    };
    fetchListaDeNomes();
  }, []); 

  useEffect(() => {
    if (listaNomesQuestoes.length === 0) return;

    const nomeDaQuestaoAtual = listaNomesQuestoes[indiceAtual];
    
    const fetchQuestao = async () => {
      setLoading(true);
      setError('');
      setDadosQuestao(null);

      try {
        const response = await axios.get(`https://localhost:5037/api/Question/${nomeDaQuestaoAtual}`);
        setDadosQuestao({
          ...response.data,
          Content: JSON.parse(response.data.Content)
        });
      } catch (err) {
        console.error("Erro ao buscar dados da questão:", err);
        setError("Não foi possível carregar a questão.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestao();
  }, [indiceAtual, listaNomesQuestoes]);

  const handleSelect = (event) => {
    if (respostaRevelada) return;
    setAlternativaSelecionada(event.target.value);
  };

  const handleAvancar = async () => {
    if (!alternativaSelecionada) {
      alert('Selecione uma alternativa');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('seuTokenDeAutenticacao');

    try {
      await axios.post(
        'https://localhost:5037/api/Quiz/submit-answer',
        { QuestionId: dadosQuestao.Id, SubmittedAnswer: alternativaSelecionada },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      setRespostaRevelada(dadosQuestao.CorrectAnswer);

      setTimeout(() => {
        if (indiceAtual < listaNomesQuestoes.length - 1) {
          setIndiceAtual(indiceAtual + 1);
        } else {
          setQuizFinalizado(true);
        }
        
        setAlternativaSelecionada(null);
        setRespostaRevelada(null);
      }, 2000);

    } catch (err) {
      console.error("Erro ao enviar resposta:", err);
      setError('Erro ao enviar resposta.');
      setLoading(false);
    }
  };

  if (error) return <div className="nivel-container-feedback error-message">{error}</div>;
  if (quizFinalizado) return <div className="nivel-container-feedback"><h2>Quiz Finalizado!</h2><p>Obrigado por participar.</p></div>;
  if (loading || !dadosQuestao) return <div className="nivel-container-feedback">Carregando...</div>;

  return (
    <div className="nivel-container">
      <header className="nivel-header">
        <button onClick={onNavigateBack} className="nav-button">
          <FaArrowLeft /> Voltar
        </button>
        <div className="progresso-quiz">{`Questão ${indiceAtual + 1} de ${listaNomesQuestoes.length}`}</div>
        <button onClick={onNavigateToPerfil} className="nav-button">
          <FaCog />
        </button>
      </header>
      
      <main className="nivel-main">
        <div className="area-pergunta">
          <h2 className="texto-pergunta">{dadosQuestao.Content.enunciado}</h2>
          <div className="form-alternativas">
            {dadosQuestao.Content.alternativas.map((alt) => {
              const getClassName = () => {
                if (!respostaRevelada) return '';
                if (alt.letra === dadosQuestao.CorrectAnswer) return 'alternativa-correta';
                if (alt.letra === alternativaSelecionada) return 'alternativa-incorreta';
                return 'alternativa-neutra';
              };
              return (
                <label key={alt.letra} htmlFor={`alt-${alt.letra}`} className={`alternativa-item ${getClassName()}`}>
                  <input
                    type="radio"
                    id={`alt-${alt.letra}`}
                    name="alternativa"
                    value={alt.letra}
                    checked={alternativaSelecionada === alt.letra}
                    onChange={handleSelect}
                    disabled={loading || respostaRevelada}
                  />
                  <span><strong>{alt.letra})</strong> {alt.texto}</span>
                </label>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="rodape-questao">
        <button className="nivel-button" onClick={handleAvancar} disabled={loading || respostaRevelada}>
          {loading || respostaRevelada ? 'Aguarde...' : 'Avançar'}
        </button>
      </footer>
    </div>
  );
};

export default Questao;