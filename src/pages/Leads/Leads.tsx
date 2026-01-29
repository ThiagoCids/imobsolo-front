import React from 'react';
// Se tiver criado o arquivo SCSS, mantenha a importação, senão pode comentar
// import './Leads.scss'; 

/**
 * Componente Leads
 * 
 * POR QUÊ?
 * - Este componente é responsável por exibir a página de gestão de leads.
 * - Mantém a estrutura simples e estilização básica.
 * - Pode ser expandido futuramente para incluir funcionalidades como filtros e tabelas.
 */

const Leads: React.FC = () => {
  return (
    <div className="leads-content" style={{ padding: '20px' }}>
      <h1>Gestão de Leads</h1>
      <p>Aqui você verá a lista de clientes interessados.</p>
    </div>
  );
};

// --- A LINHA QUE FALTAVA ---
export default Leads;