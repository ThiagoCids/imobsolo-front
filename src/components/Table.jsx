import React from 'react';
import './Table.scss';

const Table = () => {
  return (
    <div className="custom-table-container">
      {/* 1. TÍTULO FIXO (Fora da área de scroll) */}
      <div className="table-header-fixed">
        <h3>Últimos Leads (Clientes)</h3>
      </div>
      
      {/* 2. ÁREA DE SCROLL (Apenas a tabela rola aqui dentro) */}
      <div className="table-scroll-area">
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
              <td><span className="status novo">Novo</span></td>
            </tr>
            <tr>
              <td className="bold-text">Carlos Lima</td>
              <td>Casa Cond. Fechado</td>
              <td>R$ 1.200.000</td>
              <td>14/01/2026</td>
              <td><span className="status negociacao">Em Negociação</span></td>
            </tr>
            <tr>
              <td className="bold-text">Ana Paula Silva</td>
              <td>Studio Centro</td>
              <td>R$ 350.000</td>
              <td>12/01/2026</td>
              <td><span className="status vendido">Vendido</span></td>
            </tr>
            <tr>
              <td className="bold-text">Roberto Mendes</td>
              <td>Sala Comercial</td>
              <td>R$ 500.000</td>
              <td>10/01/2026</td>
              <td><span className="status novo">Novo</span></td>
            </tr>
            {/* Linhas extras para forçar rolagem e testar */}
            <tr>
              <td className="bold-text">Fernanda Oliveira</td>
              <td>Cobertura Duplex</td>
              <td>R$ 2.100.000</td>
              <td>08/01/2026</td>
              <td><span className="status negociacao">Em Negociação</span></td>
            </tr>
            <tr>
              <td className="bold-text">Lucas Pereira</td>
              <td>Terreno Alphaville</td>
              <td>R$ 450.000</td>
              <td>05/01/2026</td>
              <td><span className="status novo">Novo</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;