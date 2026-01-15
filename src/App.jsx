import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import Table from './components/Table' // <--- Importou a tabela

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <main style={{ marginLeft: '250px', padding: '30px', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div className="content" style={{ flex: 1 }}>
           {/* Cards */}
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <Card titulo="Imóveis Cadastrados" valor="124" icone="🏠" />
              <Card titulo="Clientes Ativos" valor="8" icone="👥" />
              <Card titulo="Faturamento Mensal" valor="R$ 12.500" icone="💰" />
           </div>

           {/* AQUI ESTÁ A NOSSA TABELA */}
           <Table />
           
        </div>

        <Footer />
      </main>
    </div>
  )
}

export default App