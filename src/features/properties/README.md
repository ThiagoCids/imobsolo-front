/**
 * FEATURE: PROPERTIES (IMÓVEIS)
 * =============================
 * 
 * Esta é uma feature completa responsável por toda a gestão de imóveis.
 * 
 * ESTRUTURA:
 * - components/     ← Componentes visuais específicos
 * - hooks/          ← Lógica customizada (fetches, filters, etc)
 * - types/          ← Definições de tipos TypeScript (futuro)
 * - index.js        ← Exportações públicas da feature
 * 
 * 
 * COMPONENTES DISPONÍVEIS:
 * ========================
 * 
 * PropertyCard
 * -----------
 * Componente "burro" que exibe um card de imóvel.
 * 
 * Recebe via props:
 *   data: {
 *     titulo: string
 *     endereco: string
 *     valor: string (ex: "R$ 850.000")
 *     status: 'ativo' | 'pendente' | 'vendido'
 *     imagem: string (URL)
 *     features: { beds, baths, cars, area }
 *   }
 * 
 * Importação:
 *   import PropertyCard from '@/features/properties/components/PropertyCard';
 *   // OU
 *   import { PropertyCard } from '@/features/properties';
 * 
 * Exemplo:
 *   <PropertyCard data={imovel} />
 * 
 * 
 * HOOKS CUSTOMIZADOS:
 * ====================
 * 
 * (A ser implementado)
 * 
 * usePropertiesList() → Buscar lista de imóveis
 * usePropertyDetails(id) → Buscar detalhes de um imóvel específico
 * useCreateProperty() → Criar novo imóvel
 * useUpdateProperty(id) → Atualizar imóvel
 * useDeleteProperty(id) → Deletar imóvel
 * useFilterProperties() → Filtrar imóveis por critério
 * 
 * 
 * GUIA DE USO:
 * ============
 * 
 * Em uma página:
 * 
 *   import React, { useState } from 'react';
 *   import { PropertyCard } from '@/features/properties';
 *   
 *   const Properties = () => {
 *     const [properties, setProperties] = useState([...]);
 *     
 *     return (
 *       <div className="grid">
 *         {properties.map(property => (
 *           <PropertyCard key={property.id} data={property} />
 *         ))}
 *       </div>
 *     );
 *   };
 * 
 * 
 * PRÓXIMOS PASSOS:
 * ================
 * 
 * 1. Criar arquivo PropertyCard.stories.jsx para Storybook
 * 2. Implementar hooks customizados em hooks/usePropertiesList.js
 * 3. Criar tipos TypeScript em types/property.ts
 * 4. Adicionar validações e tratamento de erros
 * 5. Integrar com API real (substituir dados mockados)
 * 
 */

export const FEATURE_INFO = {
  name: 'Properties',
  description: 'Gestão de Imóveis',
  version: '1.0',
};
