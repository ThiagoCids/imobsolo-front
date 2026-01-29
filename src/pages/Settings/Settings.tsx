import React from 'react';

/**
 * Componente Settings
 * 
 * POR QUÊ?
 * - Este componente é responsável por exibir a página de configurações do sistema.
 * - Mantém a estrutura simples e estilização básica.
 * - Pode ser expandido futuramente para incluir configurações avançadas.
 */

const Settings: React.FC = () => {
  return (
    <div className="settings-content" style={{ padding: '20px' }}>
      <h1>Configurações</h1>
      <p>Ajustes do sistema.</p>
    </div>
  );
};

export default Settings; // <--- Confira se tem isso!