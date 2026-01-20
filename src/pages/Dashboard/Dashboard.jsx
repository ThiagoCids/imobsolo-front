import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Table from '../../components/Table';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="main-content">
        {/* Passando Título e Subtítulo */}
        <Header 
          title="Dashboard Principal" 
          subtitle="Bem-vindo de volta, Thiago!" 
        />

        <div className="content-scrollable">
           {/* Grid de Cards */}
           <div className="cards-grid">
              <Card titulo="Imóveis Cadastrados" valor="124" icone="🏠" />
              <Card titulo="Clientes Ativos" valor="8" icone="👥" />
              <Card titulo="Faturamento Mensal" valor="R$ 12.500" icone="💰" />
           </div>

           {/* A Tabela já contém o título dentro dela agora */}
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