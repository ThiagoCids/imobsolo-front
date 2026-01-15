import React from 'react'
import './Card.scss'

const Card = ({ titulo, valor, icone }) => {
  return (
    <div className="card">
      <div className="card-icon">
        <span>{icone}</span>
      </div>
      <div className="card-info">
        <h4>{titulo}</h4>
        <h3>{valor}</h3>
      </div>
    </div>
  )
}

export default Card