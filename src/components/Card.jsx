import React from 'react';
// Importa o estilo específico do Card
import './Card.scss';

// O componente recebe "props" (propriedades) do pai (Dashboard)
// Desestruturação ({ titulo... }): Extrai apenas o que precisamos das props
const Card = ({ titulo, valor, icone }) => {
  return (
    <div className="dashboard-card">
      {/* Lado Esquerdo: O Ícone */}
      <div className="icon-box">
        {icone} {/* Renderiza o emoji ou ícone passado */}
      </div>
      
      {/* Lado Direito: Os Dados */}
      <div className="data-box">
        {/* span para texto pequeno/secundário */}
        <span>{titulo}</span>
        {/* h3 para o valor principal (destaque) */}
        <h3>{valor}</h3>
      </div>
    </div>
  );
};

export default Card;