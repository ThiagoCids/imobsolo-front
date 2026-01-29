import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import PropertyCard from '../../features/properties/components/PropertyCard';
import './Properties.scss';

/**
 * PropertyMock - Interface para dados mockados de imóveis
 * 
 * POR QUÊ tipo separado?
 * - Mock data tem estrutura ligeiramente diferente
 * - Property type da feature é para dados do backend
 * - Evita inconsistência entre mock e real
 */
interface PropertyMock {
  id: number;
  titulo: string;
  endereco: string;
  valor: string; // Preço formatado como string
  status: 'ativo' | 'pendente' | 'vendido';
  features: {
    beds: number;
    baths: number;
    cars: number;
    area: string;
  };
  imagem: string;
}

/**
 * Properties - Página de Gerenciamento de Imóveis
 * 
 * Responsabilidade:
 * - Exibir lista de imóveis do usuário
 * - Permitir busca e filtro
 * - Link para criar novo imóvel
 * - Integrar PropertyCard para exibição individual
 * 
 * CONVERSÃO PARA TYPESCRIPT (FASE 5):
 * - Tipagem de Property e lista
 * - Type-safe mock data
 * - React Router types
 * - Componentes tipados (Sidebar, Header, Footer, PropertyCard)
 * 
 * POR QUÊ?
 * - Valida estrutura de imóveis em compile time
 * - TypeScript detecta typos em campos
 * - IDE oferece autocomplete para property.xxx
 * 
 * LAYOUT COM 3 BLOCOS:
 * 1. Header fixo (title + subtitle)
 * 2. Busca/Filtro fixo
 * 3. Grid de PropertyCards (scrollável)
 * 4. Footer fixo
 * 
 * @component
 * @example
 * <Properties />
 */
const Properties: React.FC = () => {
  // Estado para filtro de busca
  // POR QUÊ?
  // - Permite filtrar imóveis em tempo real
  // - Preserva estado enquanto usuário navega
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Mock data de imóveis
   * 
   * ESTRUTURA (PropertyMock):
   * - id: identificador único (number)
   * - titulo: nome da propriedade
   * - endereco: endereço completo
   * - valor: preço formatado (string R$ 850.000)
   * - status: 'ativo' | 'pendente' | 'vendido'
   * - features: características (beds, baths, cars, area)
   * - imagem: URL da foto
   * 
   * POR QUÊ tipo PropertyMock[]?
   * - TypeScript valida se cada item tem os campos corretos
   * - IDE oferece autocomplete ao iterar
   * - Segurança em refatorações (renomear campo quebra build)
   */
  const mockProperties: PropertyMock[] = [
    {
      id: 1,
      titulo: 'Apartamento Jardins',
      endereco: 'Rua Oscar Freire, 1200',
      valor: 'R$ 850.000',
      status: 'ativo',
      features: { beds: 2, baths: 2, cars: 1, area: '72m²' },
      imagem: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      titulo: 'Casa em Condomínio',
      endereco: 'Av. Alphaville, 500',
      valor: 'R$ 1.200.000',
      status: 'pendente',
      features: { beds: 4, baths: 4, cars: 3, area: '250m²' },
      imagem: 'https://images.unsplash.com/photo-1600596542815-27bfef40e5a3?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      titulo: 'Studio Centro',
      endereco: 'Rua Augusta, 400',
      valor: 'R$ 350.000',
      status: 'vendido',
      features: { beds: 1, baths: 1, cars: 0, area: '35m²' },
      imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      titulo: 'Cobertura Duplex',
      endereco: 'Alameda Lorena, 1500',
      valor: 'R$ 2.800.000',
      status: 'ativo',
      features: { beds: 3, baths: 3, cars: 3, area: '180m²' },
      imagem: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      titulo: 'Sala Comercial',
      endereco: 'Centro Empresarial Norte',
      valor: 'R$ 550.000',
      status: 'ativo',
      features: { beds: 0, baths: 1, cars: 1, area: '45m²' },
      imagem: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 6,
      titulo: 'Loft Industrial',
      endereco: 'Vila Madalena, 22',
      valor: 'R$ 920.000',
      status: 'ativo',
      features: { beds: 1, baths: 1, cars: 1, area: '60m²' },
      imagem: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80'
    }
  ];

  /**
   * Filtrar imóveis por busca
   * 
   * POR QUÊ?
   * - Busca em tempo real conforme usuário digita
   * - Valida titulo, endereco, valor
   * - Busca case-insensitive
   */
  const filteredProperties = mockProperties.filter(imovel =>
    imovel.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imovel.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imovel.valor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="properties-layout">
      {/* Sidebar lateral navegação */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="main-content">
        
        {/* 1. BLOCO FIXO SUPERIOR: Título + Subtítulo */}
        <Header 
          title="Meus Imóveis" 
          subtitle="Gerencie sua carteira de propriedades."
        />

        {/* 2. BLOCO FIXO: Busca e Filtro */}
        <section className="page-actions-fixed" aria-label="Filtros e Ações">
          <div className="search-group">
            <div className="search-input-wrapper">
              <FiSearch className="icon" />
              <input 
                type="text" 
                placeholder="Buscar por título, bairro ou valor..." 
                aria-label="Campo de busca de imóveis"
                value={searchTerm}
                onChange={(e): void => setSearchTerm(e.currentTarget.value)}
              />
            </div>
            <button className="btn-filter" aria-label="Abrir filtros avançados">
              <FiFilter /> Filtrar
            </button>
          </div>
          {/* Link para criar novo imóvel */}
          <Link to="/imoveis/novo" className="btn-add-new" aria-label="Adicionar novo imóvel">
            <FiPlus /> Novo Imóvel
          </Link>
        </section>

        {/* 3. BLOCO FLEXÍVEL: Grid de Imóveis (com scroll) */}
        <div className="scrollable-area">
          <section className="properties-grid" aria-label="Lista de Imóveis Cadastrados">
            {filteredProperties.map((imovel) => (
              <PropertyCard 
                key={imovel.id} 
                data={imovel} 
              />
            ))}
          </section>
        </div>

        {/* 4. BLOCO FIXO INFERIOR: Footer */}
        {/* Fica FORA do scrollable-area para permanecer visível */}
        <footer className="footer-fixed">
          <Footer />
        </footer>

      </main>
    </div>
  );
};

export default Properties;
