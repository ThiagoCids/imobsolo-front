import React from 'react'
import './Table.scss'

const Table = () => {
  // Dados simulados dos clientes
  const clientes = [
    { nome: "Mariana Souza", imovel: "Apto Jardins", valor: "R$ 850.000", data: "15/01/2026", status: "Novo" },
    { nome: "Carlos Lima", imovel: "Casa Cond. Fechado", valor: "R$ 1.200.000", data: "14/01/2026", status: "Em Negociação" },
    { nome: "Ana Paula Silva", imovel: "Studio Centro", valor: "R$ 350.000", data: "12/01/2026", status: "Vendido" },
    { nome: "Roberto Mendes", imovel: "Sala Comercial", valor: "R$ 500.000", data: "10/01/2026", status: "Novo" },
  ]

  return (
    <div className="table-container">
      <h3>Últimos Leads (Clientes)</h3>
      
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
          {/* Aqui usamos o MAP para criar as linhas automaticamente baseado na lista acima */}
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nome}</td>
              <td>{cliente.imovel}</td>
              <td>{cliente.valor}</td>
              <td>{cliente.data}</td>
              <td className={
                cliente.status === 'Novo' ? 'status-novo' : 
                cliente.status === 'Vendido' ? 'status-vendido' : 'status-negociacao'
              }>
                {cliente.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table