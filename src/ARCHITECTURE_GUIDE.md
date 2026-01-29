/**
 * NOVA ARQUITETURA DO PROJETO - ATOMIC DESIGN + FEATURE SLICES
 * ============================================================
 * 
 * Estrutura implementada em 28/01/2026
 * 
 * PRINCÍPIOS:
 * - Atomic Design: Átomos (componentes simples) → Moléculas → Organismos → Templates → Páginas
 * - Feature Slices: Cada feature é independente e autossuficiente
 * - Escalabilidade: Fácil adicionar novos componentes e features
 * - Didática: Comentários explicativos em PT-BR em cada componente
 * 
 * ESTRUTURA DE PASTAS:
 * 
 * src/
 * ├── components/
 * │   ├── ui/              ← Componentes reutilizáveis (Átomos + Moléculas)
 * │   │   ├── Card/        
 * │   │   │   ├── Card.jsx         (Métrica genérica)
 * │   │   │   └── Card.scss
 * │   │   ├── Table/       
 * │   │   │   ├── Table.jsx        (Tabela genérica com scroll)
 * │   │   │   └── Table.scss
 * │   │   └── index.js     (Exportações centralizadas)
 * │   │
 * │   └── layout/          ← Organismos de layout da aplicação
 * │       ├── Header/
 * │       │   ├── Header.jsx       (Cabeçalho com perfil + logout)
 * │       │   └── Header.scss
 * │       ├── Sidebar/
 * │       │   ├── Sidebar.jsx      (Navegação responsiva)
 * │       │   └── Sidebar.scss
 * │       ├── Footer/
 * │       │   ├── Footer.jsx       (Rodapé simples)
 * │       │   └── Footer.scss
 * │       └── index.js     (Exportações centralizadas)
 * │
 * └── features/            ← Features específicas da aplicação
 *     ├── auth/            ← Autenticação
 *     │   ├── components/  (Componentes da feature)
 *     │   ├── hooks/       (Lógica customizada)
 *     │   └── types/       (Tipagem TypeScript - futuro)
 *     │
 *     ├── dashboard/       ← Dashboard
 *     │   ├── components/
 *     │   ├── hooks/
 *     │   └── types/
 *     │
 *     ├── properties/      ← Gestão de Imóveis
 *     │   ├── components/
 *     │   │   └── PropertyCard.jsx  (Card específico de imóvel)
 *     │   ├── hooks/       (Lógica: fetch, filters, etc)
 *     │   ├── types/
 *     │   └── index.js
 *     │
 *     ├── leads/           ← Gestão de Clientes/Leads
 *     │   ├── components/
 *     │   ├── hooks/
 *     │   └── types/
 *     │
 *     └── settings/        ← Configurações
 *         ├── components/
 *         ├── hooks/
 *         └── types/
 * 
 * 
 * PADRÕES DE IMPORTAÇÃO:
 * =====================
 * 
 * 1. Componentes de UI (genéricos):
 *    import { Card, Table } from '@/components/ui';
 *    
 * 2. Componentes de Layout:
 *    import { Header, Sidebar, Footer } from '@/components/layout';
 *    
 * 3. Features específicas:
 *    import { PropertyCard } from '@/features/properties';
 *    
 * 4. Hooks customizados:
 *    import { useAuth } from '@/hooks/useAuth';
 *    import { usePropertyList } from '@/features/properties/hooks';
 * 
 * 
 * GUIA DE DESENVOLVIMENTO:
 * ========================
 * 
 * Criar um novo ÁTOMO (componente simples, reutilizável):
 *   1. Criar pasta em src/components/ui/MeuComponente/
 *   2. MeuComponente.jsx (comentário JSDoc + componente burro)
 *   3. MeuComponente.scss (sem modificações no layout)
 *   4. Adicionar export em src/components/ui/index.js
 * 
 * Criar um novo ORGANISMO DE LAYOUT:
 *   1. Criar pasta em src/components/layout/MeuLayout/
 *   2. MeuLayout.jsx (comentário JSDoc + componente com lógica mínima)
 *   3. MeuLayout.scss
 *   4. Adicionar export em src/components/layout/index.js
 * 
 * Criar uma nova FEATURE:
 *   1. Criar pasta em src/features/minhaFeature/
 *   2. Subpastas: components/, hooks/, types/
 *   3. Componentes específicos em components/
 *   4. Lógica (useEffects, fetches) em hooks/
 *   5. Criar index.js com exportações
 * 
 * 
 * REFATORAÇÕES REALIZADAS (28/01/2026):
 * =====================================
 * 
 * ✅ Movido Card.jsx → src/components/ui/Card/Card.jsx
 * ✅ Movido Header.jsx → src/components/layout/Header/Header.jsx
 * ✅ Movido Sidebar.jsx → src/components/layout/Sidebar/Sidebar.jsx
 * ✅ Movido Footer.jsx → src/components/layout/Footer/Footer.jsx
 * ✅ Movido Table.jsx → src/components/ui/Table/Table.jsx
 * ✅ Movido PropertyCard.jsx → src/features/properties/components/PropertyCard.jsx
 * ✅ Atualizado imports em Dashboard.jsx
 * ✅ Atualizado imports em Properties.jsx
 * ✅ Adicionados comentários didáticos em PT-BR
 * ✅ Criados index.js para exportações centralizadas
 * ✅ Validação: Zero erros no lint
 * 
 * 
 * PRÓXIMOS PASSOS:
 * ================
 * 
 * 1. Extrair lógica complexa de componentes para Custom Hooks
 *    Ex: Dashboard → useDashboardData()
 *    Ex: Properties → usePropertiesList()
 * 
 * 2. Criar arquivo de tipos TypeScript (types/)
 *    Ex: types/property.ts, types/lead.ts
 * 
 * 3. Refatorar componentes de forma/input em componentes menores
 *    Ex: Login → extrair validação para custom hook
 * 
 * 4. Implementar componentes "burros" que recebem props
 *    Mover toda lógica para containers
 * 
 * 5. Centralizar estilos globais em src/styles/
 * 
 */

export const ARCHITECTURE = {
  version: '1.0',
  date: '2026-01-28',
  pattern: 'Atomic Design + Feature Slices',
};
