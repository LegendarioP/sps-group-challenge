# SPS Group Challenge - Frontend React

## 🏗️ Arquitetura

Este projeto implementa uma **Single Page Application (SPA)** utilizando **React** com **TypeScript**, seguindo padrões modernos de desenvolvimento e arquitetura escalável.

### 📁 Estrutura de Pastas

```
src/
├── components/            # Componentes reutilizáveis
│   ├── ProtectedRoute.tsx # Proteção de rotas autenticadas
├── contexts/             # Contextos React (Estado Global)
│   └── AuthContext.tsx   # Contexto de autenticação
├── hooks/                # Custom Hooks
│   ├── useListUsers.ts   # Hook para listagem de usuários
│   ├── useUpdateUser.ts  # Hook para atualização de usuários
│   ├── useDeleteUser.ts  # Hook para exclusão de usuários
│   ├── useLoginForm.ts   # Hook para formulário de login
│   └── useUserManagement.ts # Hook centralizado de usuários
├── lib/                  # Configurações de bibliotecas
│   ├── api.ts           # Configuração do Axios
│   └── api-errors.ts    # Tratamento de erros da API
├── pages/                # Páginas da aplicação
│   ├── Home.tsx         # Página inicial
│   ├── SignIn.tsx       # Página de login
│   ├── SignUp.tsx       # Página de cadastro
│   ├── Users.tsx        # Página de gestão de usuários
│   └── UserEdit.tsx     # Página de edição de usuário
├── services/            # Serviços para comunicação com API
│   ├── AuthService.ts   # Serviços de autenticação
│   └── UserService.ts   # Serviços de usuários
├── types/               # Definições de tipos TypeScript
│   ├── auth.ts         # Tipos relacionados à autenticação
│   ├── user.ts         # Tipos de usuário
│   ├── jwt.ts          # Tipos do JWT
│   └── forms.ts        # Tipos de formulários
├── utils/               # Utilitários
│   └── jwtManager.ts   # Gerenciamento de tokens JWT
├── routes.tsx          # Configuração de rotas
└── index.tsx           # Ponto de entrada da aplicação
```

## 🎯 Por que essa Arquitetura?

### **Separação de Responsabilidades:**

1. **Components**: Elementos de UI reutilizáveis e focados
2. **Pages**: Componentes de página que orquestram outros componentes
3. **Hooks**: Lógica de estado e efeitos colaterais encapsulada
4. **Services**: Comunicação com APIs e lógica de negócio
5. **Contexts**: Estado global da aplicação
6. **Utils**: Funções utilitárias puras

### **Benefícios da Arquitetura:**

- **Manutenibilidade**: Código organizado e fácil de localizar
- **Reutilização**: Componentes e hooks reutilizáveis
- **Testabilidade**: Cada parte pode ser testada isoladamente
- **Escalabilidade**: Estrutura preparada para crescimento
- **Developer Experience**: Desenvolvimento mais produtivo

### **Padrões Implementados:**

- **Custom Hooks**: Encapsulamento de lógica complexa
- **Context API**: Gerenciamento de estado global
- **Service Layer**: Abstração da comunicação com API
- **Protected Routes**: Controle de acesso baseado em autenticação
- **Error Boundaries**: Tratamento de erros estruturado

## 🔧 Tecnologias Utilizadas

### **Core:**
- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **React Router DOM** - Roteamento SPA
- **React Hook Form** - Gerenciamento de formulários

### **Estado e Comunicação:**
- **Context API** - Estado global
- **Axios** - Cliente HTTP
- **React Hooks** - Gerenciamento de estado local

### **Autenticação:**
- **JWT Decode** - Decodificação de tokens
- **js-cookie** - Gerenciamento de cookies

### **Validação:**
- **Yup** - Validação de esquemas
- **Hookform Resolvers** - Integração com React Hook Form


## 📋 Funcionalidades

### **Autenticação:**
- ✅ Login com email/senha
- ✅ Logout com limpeza de estado
- ✅ Persistência via cookies (JWT)
- ✅ Proteção de rotas
- ✅ Redirecionamento automático

### **Gestão de Usuários:**
- ✅ Listagem completa de usuários
- ✅ Pagina de edição de usuários
- ✅ Exclusão de usuários
- ✅ Criação de novos usuários
- ✅ Validação de formulários

### **Interface:**
- ✅ Loading states
- ✅ Error handling
- ✅ Feedback visual

## 🚀 Como Executar

### **Pré-requisitos:**
- Node.js 18+
- npm ou yarn
- Backend rodando na porta 3001

### **1. Instalação:**
```bash
cd test-sps-react
npm install
```

### **2. Configuração:**
```bash
# Criar arquivo .env (opcional)
echo "REACT_APP_SERVER_URL=http://localhost:3001" > .env
```

### **3. Execução:**

**Desenvolvimento:**
```bash
npm start
```

**Build de Produção:**
```bash
npm run build
```

**Testes:**
```bash
npm test
```

### **4. Acesso:**
- **URL:** http://localhost:3000
- **Login Admin:** admin@sps.com / 1234

## 🗺️ Rotas da Aplicação

```typescript
// Rotas Públicas
/               → Home (Landing Page)
/signin         → Página de Login
/signup         → Página de Cadastro

// Rotas Protegidas (requer autenticação)
/users          → Listagem e Gestão de Usuários
/users/:id      → Edição de Usuário Específico
```

## 🔐 Sistema de Autenticação

### **Fluxo de Autenticação:**

```
1. Login → JWT Token → Cookie Storage
2. Página Protegida → Verificar Cookie → Decodificar Token
3. Token Válido → Permitir Acesso
4. Token Inválido/Expirado → Redirect Login
```

### **AuthContext:**
```typescript
interface AuthContextType {
  user: User | null;           // Dados do usuário
  token: string | null;        // JWT token
  login: (token, user) => void; // Função de login
  logout: () => void;          // Função de logout
  isAuthenticated: boolean;    // Status de autenticação
  isLoading: boolean;          // Estado de carregamento
}
```

## 🛠️ Serviços

### **AuthService:**
- Login de usuários
- Tratamento de erros de autenticação
- Integração com API

### **UserService:**
- CRUD completo de usuários
- Tipagem TypeScript completa
- Tratamento de erros HTTP

### **JwtManager:**
```typescript
class JwtManager {
  setToken(token: string): void           // Salvar token no cookie
  getTokenFromCookies(): string          // Recuperar token
  getDecodedToken(): UserTokenData       // Decodificar token
  removeToken(): void                    // Remover token
}
```

## 🎨 Padrões de Design

### **Atomic Design Concepts:**
- **Pages**: Páginas completas
- **Components**: Elementos reutilizáveis
- **Hooks**: Lógica de negócio encapsulada

### **Error Handling:**
- Try/catch em todas as operações async
- Estados de erro específicos por operação
- Feedback visual para o usuário

### **Loading States:**
- Loading global (AuthContext)
- Loading específico por operação
- Estados intermediários bem definidos

### **Type Safety:**
- Interfaces para todos os dados
- Tipagem completa de props
- Type guards onde necessário

## 🔄 Integração com Backend

### **API Client:**
```typescript
// API Pública (não requer autenticação)
apiPublic.post('/users', userData);

// API Privada (requer JWT)
apiPrivate.get('/users');
apiPrivate.put('/users/:id', userData);
```

### **Interceptors:**
- Adição automática do JWT em requisições privadas
- Tratamento global de erros
- Retry automático em falhas de rede


## 🔧 Scripts Disponíveis

```bash
npm start          # Servidor de desenvolvimento
npm run build      # Build de produção
npm test           # Executar testes
npm run eject      # Ejetar configuração (irreversível)
```

### PRUEBA SPS REACT

- Crear un CRUD de usuarios

### Reglas

- Crear la página de inicio de sesión (signIn) para autenticar al usuario (usar el usuario previamente registrado para validar).
- Se puede utilizar cualquier tipo de almacenamiento para guardar el token.
- Solo será posible registrar y/o visualizar usuarios si el usuario está autenticado.
- Consumir la API creada anteriormente (test-sps-server).

---

## 🔗 Relacionado

- [Backend API](../test-sps-server/README.md) - Documentação da API
- [Arquitetura Clean](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

# SPS REACT TEST

- Criar um CRUD de usuários

# Regras

- Criar a página de signIn para fazer a autenticação do usuário (Usar o usuário previamente cadastrado para validar)
- Pode usar qualquer tipo de storage para guardar o token
- Só será possível cadastrar e/ou visualizar os usuários se estiver autenticado
- Chamar a API que foi criada anteriormente (test-sps-server)
