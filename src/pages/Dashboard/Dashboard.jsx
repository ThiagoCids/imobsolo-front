import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Table from '../../components/Table';
import './Dashboard.scss';

const Dashboard = () => {
  // --- SIMULAÇÃO DE DADOS DO USUÁRIO (Vindo do Banco de Dados) ---
  const usuarioLogado = {
    nome: "Thiago Henrique Domingues",
    genero: "masculino", // Tente mudar para 'feminino' depois para testar
  };

  // --- A REGRA DE GÊNERO ---
  // Se gênero for 'feminino', escreve "bem-vinda". Senão, "bem-vindo".
  const fraseBoasVindas = usuarioLogado.genero === 'feminino' 
    ? "Seja bem-vinda de volta." 
    : "Seja bem-vindo de volta.";

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="main-content">
        {/* Passamos o nome e a frase calculada para o Header */}
        <Header 
          title={usuarioLogado.nome} 
          subtitle={fraseBoasVindas} 
        />

        <div className="content-scrollable">
           <div className="cards-grid">
              <Card titulo="Imóveis Cadastrados" valor="124" icone="🏠" />
              <Card titulo="Clientes Ativos" valor="8" icone="👥" />
              <Card titulo="Faturamento Mensal" valor="R$ 12.500" icone="💰" />
           </div>

           <div className="table-section">
              <Table />
           </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;