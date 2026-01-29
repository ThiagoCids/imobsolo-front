import React from 'react';
import type { CardProps } from '../types';
import './Card.scss';

/**
 * Card Genérico - Componente Átomo para exibir métricas
 * 
 * Este é um componente "burro" ou "apresentacional" que não contém lógica.
 * Sua única responsabilidade é renderizar dados que recebe via props.
 * 
 * Padrão Atomic Design: ÁTOMO
 * - Componentes genéricos reutilizáveis
 * - Sem estado interno (stateless)
 * - Apenas recebem props e exibem
 * 
 * CONVERSÃO PARA TYPESCRIPT:
 * - Tipagem de props com CardProps interface
 * - Union type para 'tipo' garante apenas valores válidos
 * - Componente recebe valores tipificados
 * - Melhor autocomplete ao usar o componente
 * 
 * POR QUÊ CardProps é genérico?
 * - Permite reutilização em diferentes contextos
 * - Pode receber qualquer tipo de icone (ReactNode)
 * - Flexível para futuras extensões
 * 
 * @component
 * @param {CardProps} props - Props do Card
 * @param {string} props.titulo - Título principal do card
 * @param {string | number} props.valor - Valor destaque do card
 * @param {ReactNode} props.icone - Ícone React (ex: <MdHome />)
 * @param {CardVariant} [props.tipo='default'] - Tipo visual para estilização
 * @param {string} [props.subtitulo] - Texto secundário opcional
 * @param {() => void} [props.onClick] - Callback ao clicar no card
 * @param {string} [props.className] - Classes CSS customizadas
 * 
 * @example
 * // Uso básico
 * <Card 
 *   titulo="Imóveis" 
 *   valor={124} 
 *   icone={<MdHomeWork />} 
 *   tipo="positiva"
 *   subtitulo="+8 este mês"
 * />
 * 
 * @example
 * // Com callback
 * <Card
 *   titulo="Leads"
 *   valor={45}
 *   icone={<MdOutlineGroup />}
 *   tipo="neutra"
 *   onClick={() => navigate('/leads')}
 * />
 */
const Card: React.FC<CardProps> = ({ 
  titulo, 
  valor, 
  icone, 
  tipo = 'default', 
  subtitulo,
  onClick,
  className 
}) => {
  /**
   * Handler de clique
   * 
   * POR QUÊ?
   * - Se onClick foi fornecido, executa
   * - Permite usar Card como botão quando necessário
   * - Mantém componente flexível
   */
  const handleClick = (): void => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`dashboard-card card-${tipo} ${className || ''}`}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick();
              }
            }
          : undefined
      }
    >
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
