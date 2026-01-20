import React from 'react';
import './Table.scss';

const Table = () => {
  return (
    <div className="custom-table-container">
      {/* Título da Tabela dentro do container branco */}
      <div className="table-header">
        <h3>Últimos Leads (Clientes)</h3>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Interesse</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bold-text">Mariana Souza</td>
            <td>Apto Jardins</td>
            <td>R$ 850.000</td>
            <td>15/01/2026</td>
            {/* Status Roxo/Azul */}
            <td><span className="status novo">Novo</span></td>
          </tr>
          <tr>
            <td className="bold-text">Carlos Lima</td>
            <td>Casa Cond. Fechado</td>
            <td>R$ 1.200.000</td>
            <td>14/01/2026</td>
            {/* Status Laranja */}
            <td><span className="status negociacao">Em Negociação</span></td>
          </tr>
          <tr>
            <td className="bold-text">Ana Paula Silva</td>
            <td>Studio Centro</td>
            <td>R$ 350.000</td>
            <td>12/01/2026</td>
            {/* Status Verde */}
            <td><span className="status vendido">Vendido</span></td>
          </tr>
          <tr>
            <td className="bold-text">Roberto Mendes</td>
            <td>Sala Comercial</td>
            <td>R$ 500.000</td>
            <td>10/01/2026</td>
            {/* Status Roxo/Azul */}
            <td><span className="status novo">Novo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Table;