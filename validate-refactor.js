#!/usr/bin/env node
/**
 * CHECKLIST DE VALIDAÇÃO - REFATORAÇÃO ATOMIC DESIGN
 * 
 * Use este script para verificar se a refatoração foi bem-sucedida
 * Você pode rodar: npm lint ou yarn lint
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_PATHS = [
  // UI Components
  'src/components/ui/Card/Card.jsx',
  'src/components/ui/Card/Card.scss',
  'src/components/ui/Table/Table.jsx',
  'src/components/ui/Table/Table.scss',
  'src/components/ui/index.js',

  // Layout Components
  'src/components/layout/Header/Header.jsx',
  'src/components/layout/Header/Header.scss',
  'src/components/layout/Sidebar/Sidebar.jsx',
  'src/components/layout/Sidebar/Sidebar.scss',
  'src/components/layout/Footer/Footer.jsx',
  'src/components/layout/Footer/Footer.scss',
  'src/components/layout/index.js',

  // Features
  'src/features/properties/components/PropertyCard.jsx',
  'src/features/properties/components/PropertyCard.scss',
  'src/features/properties/index.js',
  'src/features/properties/README.md',

  // Documentation
  'src/ARCHITECTURE_GUIDE.md',
  'REFACTORING_SUMMARY.md',
];

const SHOULD_NOT_EXIST = [
  'src/components/Card.jsx',
  'src/components/Card.scss',
  'src/components/Header.jsx',
  'src/components/Header.scss',
  'src/components/Footer.jsx',
  'src/components/Footer.scss',
  'src/components/Sidebar.jsx',
  'src/components/Sidebar.scss',
  'src/components/Table.jsx',
  'src/components/Table.scss',
  'src/components/PropertyCard',
];

const rootDir = process.cwd();
let errors = [];
let warnings = [];

console.log('🔍 Verificando estrutura da refatoração...\n');

// Verificar arquivos que DEVEM existir
console.log('✅ Arquivos que DEVEM existir:');
REQUIRED_PATHS.forEach(filePath => {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`   ✓ ${filePath}`);
  } else {
    console.log(`   ✗ ${filePath} - NÃO ENCONTRADO`);
    errors.push(`Arquivo necessário não encontrado: ${filePath}`);
  }
});

console.log('\n❌ Arquivos que NÃO devem existir (antigos):');
SHOULD_NOT_EXIST.forEach(filePath => {
  const fullPath = path.join(rootDir, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`   ✓ ${filePath} - removido corretamente`);
  } else {
    console.log(`   ✗ ${filePath} - AINDA EXISTE!`);
    warnings.push(`Arquivo antigo ainda presente: ${filePath}`);
  }
});

// Verificar imports em arquivos críticos
console.log('\n📋 Verificando imports em arquivos críticos:');

const filesToCheck = [
  'src/pages/Dashboard/Dashboard.jsx',
  'src/pages/Properties/Properties.jsx',
];

filesToCheck.forEach(filePath => {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Verificar se há imports antigos
    const oldImports = [
      "from '../../components/Card'",
      "from '../../components/Header'",
      "from '../../components/Footer'",
      "from '../../components/Sidebar'",
      "from '../../components/Table'",
      "from '../../components/PropertyCard/PropertyCard'",
    ];
    
    const hasOldImports = oldImports.some(imp => content.includes(imp));
    if (hasOldImports) {
      console.log(`   ✗ ${filePath} - contém imports ANTIGOS`);
      errors.push(`${filePath} ainda usa imports antigos`);
    } else {
      console.log(`   ✓ ${filePath} - imports OK`);
    }
  }
});

// Resultado final
console.log('\n' + '='.repeat(60));
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ VALIDAÇÃO COMPLETA - TUDO OK!');
  console.log('A refatoração foi executada com sucesso.');
  process.exit(0);
} else {
  if (errors.length > 0) {
    console.log(`❌ ERROS ENCONTRADOS: ${errors.length}`);
    errors.forEach(err => console.log(`   - ${err}`));
  }
  if (warnings.length > 0) {
    console.log(`⚠️  AVISOS: ${warnings.length}`);
    warnings.forEach(warn => console.log(`   - ${warn}`));
  }
  process.exit(1);
}
