import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './AddQuestao.css';
//addquestao
const SelectInput = ({ label, name, value, onChange, options, placeholder }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} value={value} onChange={onChange} required>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const AddQuestao = ({ onNavigateBack, onNavigateToCriarQuestao }) => {
  const [formData, setFormData] = useState({
    numQuestao: '',
    nivel: '',
    ano: '',
    fase: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onNavigateToCriarQuestao) {
      onNavigateToCriarQuestao(formData);
    }
  };
  
  const questoesOptions = Array.from({ length: 15 }, (_, i) => i + 1);
  const niveisOptions = ['Júnior', '1', '2'];
  const anosOptions = ['2018', '2019', '2020'];
  const fasesOptions = ['1', '2', '3'];

  return (
    <div className="container">
      <header className="add-questao-header">
        <button onClick={onNavigateBack} className="nav-button">
          <FaArrowLeft /> Voltar
        </button>
      </header>

      <div className="title-bar">
        <h1>ADICIONAR QUESTÃO</h1>
      </div>

      <main className="add-questao-main">
        <form className="add-questao-form" onSubmit={handleSubmit}>
          
          <SelectInput
            label="N° da questão"
            name="numQuestao"
            value={formData.numQuestao}
            onChange={handleChange}
            options={questoesOptions}
            placeholder="Selecione o número"
          />

          <SelectInput
            label="Nível"
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            options={niveisOptions}
            placeholder="Selecione o nível"
          />

          <SelectInput
            label="Ano"
            name="ano"
            value={formData.ano}
            onChange={handleChange}
            options={anosOptions}
            placeholder="Selecione o ano"
          />

          <SelectInput
            label="Fase"
            name="fase"
            value={formData.fase}
            onChange={handleChange}
            options={fasesOptions}
            placeholder="Selecione a fase"
          />

          <button type="submit" className="link-button">
            Próximo
          </button>
          
        </form>
      </main>
    </div>
  );
};

export default AddQuestao;