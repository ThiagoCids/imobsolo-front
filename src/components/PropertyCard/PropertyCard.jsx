import React from 'react';
import { FiEdit3, FiMaximize2 } from 'react-icons/fi';
// Importamos o estilo isolado deste componente
import './PropertyCard.scss';

/**
 * Componente PropertyCard
 * Responsabilidade: Exibir visualmente os dados de UM imóvel.
 * * @param {Object} data - Objeto contendo as informações do imóvel (titulo, preço, imagem, etc).
 */
const PropertyCard = ({ data }) => {

  // Função auxiliar para formatar o texto do status (ex: 'ativo' -> 'Ativo')
  const formatStatus = (status) => {
    const statusMap = {
      ativo: 'Ativo',
      pendente: 'Pendente',
      vendido: 'Vendido'
    };
    return statusMap[status] || status;
  };

  return (
    // SEMÂNTICA: <article> indica que este card é um conteúdo independente.
    // Se você tirá-lo daqui e colocar em outro site, ele ainda faz sentido sozinho.
    <article className="property-card">
      
      {/* SEMÂNTICA: <header> do card contendo a imagem e a etiqueta de status */}
      <header className="card-image-container">
        <img 
          src={data.imagem} 
          alt={`Foto principal de ${data.titulo}`} 
          className="property-image"
        />
        {/* Badge dinâmica baseada no status (verde, laranja, azul) */}
        <span className={`status-badge ${data.status}`}>
          {formatStatus(data.status)}
        </span>
      </header>

      {/* Corpo do Conteúdo */}
      <div className="card-body">
        
        {/* Informações Principais */}
        <div className="main-info">
           {/* O preço é a info mais relevante, usamos strong ou um h semântico apropriado */}
           <strong className="price">{data.valor}</strong>
           <h3 className="title" title={data.titulo}>{data.titulo}</h3>
           <p className="address">{data.endereco}</p>
        </div>

        {/* SEMÂNTICA: Características são uma LISTA. Usamos <ul> e <li>. */}
        <ul className="features-list">
          {/* aria-label ajuda leitores de tela a entenderem o que o emoji significa */}
          <li title="Quartos">
            <span role="img" aria-label="quartos">🛏️</span> {data.features.beds}
          </li>
          <li title="Banheiros">
            <span role="img" aria-label="banheiros">🚿</span> {data.features.baths}
          </li>
          <li title="Vagas de Garagem">
            <span role="img" aria-label="carros">🚗</span> {data.features.cars}
          </li>
          <li title="Área total">
            <span role="img" aria-label="área">📐</span> {data.features.area}
          </li>
        </ul>

        {/* SEMÂNTICA: <footer> do card para as ações finais */}
        <footer className="card-actions">
          <button className="btn-details">
            <FiMaximize2 /> Ver Detalhes
          </button>
          <button className="btn-edit" aria-label="Editar Imóvel">
            <FiEdit3 />
          </button>
        </footer>

      </div>
    </article>
  );
};

export default PropertyCard;