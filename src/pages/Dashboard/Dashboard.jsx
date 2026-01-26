import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  MdOutlineHomeWork,
  MdOutlineGroup,
  MdOutlineAttachMoney,
  MdOutlineShowChart
} from 'react-icons/md';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Table from '../../components/Table';
import './Dashboard.scss';

const Dashboard = () => {
  const { user } = useAuth();

  // Dados do dashboard
  const dashboardCards = [
    {
      titulo: 'Imóveis Cadastrados',
      valor: '124',
      icone: <MdOutlineHomeWork />,
      tipo: 'default',
      subtitulo: '+8 este mês'
    },
    {
      titulo: 'Clientes Ativos',
      valor: '8',
      icone: <MdOutlineGroup />,
      tipo: 'success',
      subtitulo: '+2 novos'
    },
    {
      titulo: 'Faturamento Mensal',
      valor: 'R$ 12.500',
      icone: <MdOutlineAttachMoney />,
      tipo: 'warning',
      subtitulo: '+15% vs. mês anterior'
    },
    {
      titulo: 'Taxa de Conversão',
      valor: '28%',
      icone: <MdOutlineShowChart />,
      tipo: 'danger',
      subtitulo: '-3% vs. mês anterior'
    }
  ];

  // Determinar frase de boas-vindas
  const fraseBoasVindas = user?.genero === 'feminino'
    ? 'Seja bem-vinda de volta'
    : 'Seja bem-vindo de volta';

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <div className="dashboard-container">
          <Header
            title={user?.nome || 'Dashboard'}
            subtitle={fraseBoasVindas}
          />

          <div className="content-scrollable">
            <div className="cards-grid">
              {dashboardCards.map((card, index) => (
                <Card
                  key={index}
                  titulo={card.titulo}
                  valor={card.valor}
                  icone={card.icone}
                  tipo={card.tipo}
                  subtitulo={card.subtitulo}
                />
              ))}
            </div>

            <div className="table-section">
              <h3 className="section-title">Últimas Transações</h3>
              <Table />
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;