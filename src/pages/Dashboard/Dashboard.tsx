import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardData } from '../../features/dashboard/hooks/useDashboardData';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import Card from '../../components/ui/Card/Card';
import Table from '../../components/ui/Table/Table';
import './Dashboard.scss';

/**
 * Dashboard - Página Principal da Aplicação
 * 
 * REFATORAÇÃO (FASE 2):
 * Este componente agora é muito mais limpo e focado em renderização.
 * Toda a lógica de dados foi movida para o hook useDashboardData().
 * 
 * POR QUÊ?
 * - Componentes "burros" são mais fáceis de testar
 * - Dados podem ser atualizados independentemente do componente
 * - Preparado para integração com API
 * - Fácil reutilizar dados em outras páginas
 * 
 * CONVERSÃO PARA TYPESCRIPT (FASE 5):
 * - Tipagem de hooks (useAuth, useDashboardData)
 * - Type-safe para componentes filhos
 * - Melhor erro detection em compile time
 * - React.FC pattern (sem props, mas ainda tipificado)
 * 
 * RESPONSABILIDADE:
 * - Recuperar dados via hooks (useAuth, useDashboardData)
 * - Passar dados para componentes filhos via props
 * - Renderizar o layout do dashboard
 * 
 * @component
 * @example
 * <Dashboard />
 */
const Dashboard: React.FC = () => {
  // Hook de autenticação - fornece dados do usuário
  // Tipagem automática: UseAuthReturn
  const { user } = useAuth();

  // Hook customizado - fornece dados do dashboard
  // Tipagem automática: DashboardDataReturn
  const { dashboardCards, getWelcomeMessage } = useDashboardData();

  /**
   * Determinar frase de boas-vindas personalizada
   * 
   * POR QUÊ usar optional chaining?
   * - Evita erro se user for null
   * - Seguro para accesso de propriedades aninhadas
   * - TypeScript valida a existência da propriedade
   */
  const fraseBoasVindas = getWelcomeMessage(user?.genero || 'masculino');

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
            {/* Grid de Cards com Métricas KPI */}
            <div className="cards-grid">
              {dashboardCards.map((card) => (
                <Card
                  key={card.id}
                  titulo={card.titulo}
                  valor={card.valor}
                  icone={card.icone}
                  tipo={card.tipo}
                  subtitulo={card.subtitulo}
                />
              ))}
            </div>

            {/* Seção de Tabela de Leads */}
            <div className="table-section">
              <h3 className="section-title">Últimas Transações</h3>
              <Table data={[]} columns={[]} />
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
