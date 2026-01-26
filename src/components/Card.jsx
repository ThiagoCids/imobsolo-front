import React from 'react';
import './Card.scss';

/**
 * Card de Dashboard - Exibe métricas principais
 * @param {Object} props
 * @param {string} props.titulo - Título do card
 * @param {string|number} props.valor - Valor principal
 * @param {JSX.Element} props.icone - Ícone React (ex: <MdHome />)
 * @param {string} props.tipo - Tipo: 'default', 'success', 'warning', 'danger'
 * @param {string} props.subtitulo - Texto secundário (opcional)
 */
const Card = ({ titulo, valor, icone, tipo = 'default', subtitulo }) => {
  return (
    <div className={`dashboard-card card-${tipo}`}>
      <div className="card-header">
        <div className={`icon-box icon-${tipo}`}>
          {icone}
        </div>
        <h3 className="card-title">{titulo}</h3>
      </div>

      <div className="card-content">
        <p className="card-value">{valor}</p>
        {subtitulo && <p className="card-subtitle">{subtitulo}</p>}
      </div>
    </div>
  );
};

export default Card;