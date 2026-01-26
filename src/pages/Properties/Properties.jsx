import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './Properties.scss';

const Properties = () => {
  const mockProperties = [
    {
      id: 1,
      titulo: "Apartamento Jardins",
      endereco: "Rua Oscar Freire, 1200",
      valor: "R$ 850.000",
      status: "ativo",
      features: { beds: 2, baths: 2, cars: 1, area: "72m²" },
      imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      titulo: "Casa em Condomínio",
      endereco: "Av. Alphaville, 500",
      valor: "R$ 1.200.000",
      status: "pendente",
      features: { beds: 4, baths: 4, cars: 3, area: "250m²" },
      imagem: "https://images.unsplash.com/photo-1600596542815-27bfef40e5a3?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      titulo: "Studio Centro",
      endereco: "Rua Augusta, 400",
      valor: "R$ 350.000",
      status: "vendido",
      features: { beds: 1, baths: 1, cars: 0, area: "35m²" },
      imagem: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      titulo: "Cobertura Duplex",
      endereco: "Alameda Lorena, 1500",
      valor: "R$ 2.800.000",
      status: "ativo",
      features: { beds: 3, baths: 3, cars: 3, area: "180m²" },
      imagem: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      titulo: "Sala Comercial",
      endereco: "Centro Empresarial Norte",
      valor: "R$ 550.000",
      status: "ativo",
      features: { beds: 0, baths: 1, cars: 1, area: "45m²" },
      imagem: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        titulo: "Loft Industrial",
        endereco: "Vila Madalena, 22",
        valor: "R$ 920.000",
        status: "ativo",
        features: { beds: 1, baths: 1, cars: 1, area: "60m²" },
        imagem: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80"
      }
  ];

  return (
    <div className="properties-layout">
      <Sidebar />

      <main className="main-content">
        {/* --- 1. BLOCO FIXO SUPERIOR --- */}
        <Header 
          title="Meus Imóveis" 
          subtitle="Gerencie sua carteira de propriedades."
          usuario="Thiago Domingues"
        />

        <section className="page-actions-fixed" aria-label="Filtros e Ações">
          <div className="search-group">
              <div className="search-input-wrapper">
                  <FiSearch className="icon" />
                  <input 
                    type="text" 
                    placeholder="Buscar por título, bairro ou valor..." 
                    aria-label="Campo de busca"
                  />
              </div>
              <button className="btn-filter">
                  <FiFilter /> Filtrar
              </button>
          </div>
          <Link to="/imoveis/novo" className="btn-add-new">
            <FiPlus /> Novo Imóvel
          </Link>
        </section>

        {/* --- 2. BLOCO FLEXÍVEL (ROLA) --- */}
        <div className="scrollable-area">
            <section className="properties-grid" aria-label="Lista de Imóveis Cadastrados">
              {mockProperties.map((imovel) => (
                 <PropertyCard key={imovel.id} data={imovel} />
              ))}
            </section>
        </div>

        {/* --- 3. BLOCO FIXO INFERIOR (FOOTER) --- */}
        {/* Agora ele está FORA do scrollable-area */}
        <footer className="footer-fixed">
            <Footer />
        </footer>

      </main>
    </div>
  );
};

export default Properties;