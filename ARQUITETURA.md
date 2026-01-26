# 📚 Documentação da Arquitetura - ImobSolo Frontend

## 🎯 Visão Geral

Este documento descreve a estrutura profissional e escalável implementada no projeto ImobSolo Frontend.

---

## 📁 Estrutura de Pastas

```
src/
├── assets/              # Imagens, ícones, fontes
├── components/          # Componentes reutilizáveis (Header, Sidebar, Card, etc)
├── pages/               # Páginas da aplicação (Dashboard, Login, Properties, etc)
├── context/             # Context API para estado global
│   └── AuthContext.jsx  # Gerencia autenticação
├── hooks/               # Hooks customizados
│   └── useAuth.js       # Hook para acessar AuthContext
├── services/            # Serviços para chamadas de API (futuro)
├── utils/               # Funções utilitárias
├── constants/           # Constantes da aplicação
├── config/              # Configurações gerais
├── App.jsx              # Componente raiz
├── main.jsx             # Entrada principal
└── index.scss           # Estilos globais
```

---

## 🔐 Autenticação com Context API

### O que é Context API?

Context API é um padrão React para gerenciar estado **global** sem precisar passar props por muitos níveis.

### Diferença: Simulado vs Context API

#### ❌ **ANTES (Simulado)**
```jsx
// Em Login.jsx - Lógica de login local
const handleSubmit = () => {
  setIsLoading(true);
  setTimeout(() => {
    navigate('/dashboard'); // Apenas redireciona
  }, 1500);
};
```

**Problemas:**
- Sem persistência do usuário
- Se atualizar a página, perde o login
- Dados do usuário não acessíveis em outros componentes
- Difícil de testar
- Código duplicado se precisar login em vários lugares

#### ✅ **AGORA (Context API)**
```jsx
// Em AuthContext.jsx - Lógica centralizada
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = async (email, password) => {
    // TODO: Chamada real à API quando backend estiver pronto
    const userData = { email, nome, avatar, ... };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persiste
    return { success: true };
  };
  
  // Recarregar usuário ao iniciar app
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);
  
  return <AuthContext.Provider value={{user, login, logout, ...}}>;
};
```

**Benefícios:**
✅ Estado persiste no localStorage (mesmo após atualizar)  
✅ Dados acessíveis em qualquer componente com `useAuth()`  
✅ Lógica de auth centralizada e fácil de manter  
✅ Fácil integrar com API real depois  
✅ Melhor para testes  

### Como Usar

```jsx
import { useAuth } from '../../hooks/useAuth';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <p>Olá, {user.nome}!</p>;
  }
  
  return <p>Faça login para continuar</p>;
}
```

---

## 🎨 Melhorias Estéticas Implementadas

### 1. **Paleta de Cores Expandida**
- Cores primárias com gradientes
- Status colors (success, warning, danger)
- Shadows para profundidade
- Transições suaves

### 2. **Responsividade Completa**
- **Desktop:** Layout full com sidebar fixa
- **Tablet (768px):** Sidebar colapsável
- **Mobile (480px):** Hamburger menu, stack vertical

### 3. **Componentes Melhorados**
- Cards com animações ao hover
- Ícones profissionais (react-icons)
- Estados visuais (loading, disabled, error)
- Spacing consistente

### 4. **Sidebar Responsivo**
```jsx
// Mobile: Hamburger menu
// Tablet: Sidebar desliza de fora
// Desktop: Sidebar fixa 250px
```

### 5. **Login com Gradientes**
- Background com gradient blur
- Animações de entrada
- Show/hide password
- Validação em tempo real

---

## 🛠️ Configurações Importantes

### `.env.example`
Variáveis de ambiente que você deve copiar para `.env`:

```bash
VITE_API_URL=http://localhost:3000  # URL do backend
VITE_ENV=development                 # Ambiente atual
VITE_DEBUG=true                       # Log de debug
```

### `.prettierrc`
Configuração de formatação automática de código. Execute:
```bash
npm run prettier  # Formata tudo automaticamente
```

### `package.json`
Adicione estes scripts para facilitar:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "prettier": "prettier --write .",
    "preview": "vite preview"
  }
}
```

---

## 🚀 Próximos Passos

### 1. **Integrar com Backend Real**
```jsx
// Em services/api.js
export const loginAPI = async (email, password) => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Em AuthContext.jsx
const login = async (email, password) => {
  const result = await loginAPI(email, password);
  if (result.token) {
    localStorage.setItem('token', result.token);
    setUser(result.user);
  }
};
```

### 2. **Adicionar Rota Protegida**
```jsx
// Em main.jsx - ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

// Usar em rotas
{
  path: "/dashboard",
  element: <ProtectedRoute element={<Dashboard />} />
}
```

### 3. **Implementar Testes**
```bash
npm install --save-dev vitest @testing-library/react
```

### 4. **Adicionar TypeScript** (Opcional)
```bash
npm install --save-dev typescript @types/react
```

---

## 📋 Checklist de Implementação

- [x] Estrutura de pastas profissional
- [x] Context API para autenticação
- [x] Responsividade completa
- [x] Design moderno com gradientes
- [x] Componentes reutilizáveis
- [x] Variáveis de ambiente
- [x] Prettier config
- [ ] Integração com API real
- [ ] Rotas protegidas
- [ ] Testes automatizados

---

## 🎓 Recursos para Aprender Mais

- [React Context API - Documentação Oficial](https://react.dev/reference/react/useContext)
- [Responsive Design - MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [SCSS Best Practices](https://sass-lang.com/guide)
- [React Hooks - Guia Completo](https://react.dev/reference/react/hooks)

---

## 💡 Dicas para Manutenção

1. **Sempre use o `useAuth()` hook** ao precisar dados do usuário
2. **Mantenha a paleta de cores em `index.scss`** para consistência
3. **Use variáveis CSS** (`var(--primary-blue)`) em vez de hardcoded
4. **Teste responsividade** em mobile, tablet e desktop
5. **Respeite o naming** das classes (ex: `.card-{type}`)

---

**Versão:** 1.0.0  
**Data:** 26 de Janeiro de 2026  
**Autores:** Desenvolvido com ❤️ por Thiago Henrique Domingues
