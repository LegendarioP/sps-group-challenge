# SPS Group Challenge - Backend API

## 🏗️ Arquitetura

Este projeto implementa uma **API RESTful** utilizando **Express.js** com **Clean Architecture** e princípios **SOLID**.

### 📁 Estrutura de Pastas

```
src/
├── domain/                 # Camada de Domínio
│   ├── entities/          # Entidades de negócio
│   ├── repositories/      # Interfaces dos repositórios
│   └── services/          # Serviços de domínio
├── application/           # Camada de Aplicação
│   └── use-cases/        # Casos de uso (regras de negócio)
│       ├── auth/         # Casos de uso de autenticação
│       └── users/        # Casos de uso de usuários
├── infrastructure/       # Camada de Infraestrutura
│   ├── db/              # Implementações de repositórios
│   ├── security/        # Implementações de segurança
│   └── config/          # Configurações
├── presentation/         # Camada de Apresentação
│   ├── controllers/     # Controladores HTTP
│   ├── dtos/           # Objetos de transferência de dados
│   └── middlewares/    # Middlewares do Express
└── shared/              # Recursos compartilhados
    ├── errors/         # Classes de erro customizadas
    └── types/          # Tipos TypeScript compartilhados
```

## 🎯 Por que Clean Architecture + SOLID?

### **Clean Architecture Benefits:**

1. **Separação de Responsabilidades**: Cada camada tem sua responsabilidade específica
2. **Independência de Frameworks**: O domínio não depende do Express ou qualquer framework
3. **Testabilidade**: Fácil de testar cada camada isoladamente
4. **Manutenibilidade**: Mudanças em uma camada não afetam outras
5. **Escalabilidade**: Estrutura preparada para crescimento da aplicação


## 🔧 Tecnologias Utilizadas

- **Express.js** - Framework web minimalista
- **TypeScript** - Tipagem estática
- **JWT** - Autenticação via tokens
- **bcrypt** - Hash de senhas
- **CORS** - Controle de acesso cross-origin
- **Helmet** - Segurança HTTP
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📋 Funcionalidades

### **Autenticação:**
- ✅ Login com email/senha
- ✅ Geração de JWT tokens
- ✅ Middleware de autenticação
- ✅ Hash seguro de senhas

### **Gestão de Usuários:**
- ✅ Criação de usuários
- ✅ Listagem de usuários (protegida)
- ✅ Atualização de usuários (protegida)
- ✅ Diferentes tipos de usuários (admin/user)

### **Segurança:**
- ✅ Validação de dados
- ✅ Proteção contra ataques comuns
- ✅ Autenticação baseada em JWT
- ✅ CORS configurado

## 🚀 Como Executar

### **Pré-requisitos:**
- Node.js 18+ 
- npm ou yarn

### **1. Instalação:**
```bash
cd test-sps-server
npm install
```

### **2. Configuração:**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure as variáveis (opcional - já tem defaults)
# PORT=3001
# JWT_SECRET=your-secret-key
```

### **3. Execução:**

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm start
```

### **4. Servidor:**
- **URL:** http://localhost:3001
- **Health Check:** GET /

## 📚 API Endpoints

### **Autenticação:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### **Usuários:**
```http
# Criar usuário
POST /users
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "password": "password123",
  "type": "user"
}

# Listar usuários (requer autenticação)
GET /users
Authorization: Bearer <jwt-token>

# Atualizar usuário (requer autenticação)
PUT /users/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "nome": "John Doe",
  "email": "john.doe@example.com"
}
```

## 🧪 Usuários de Teste

O sistema já vem com usuário pré-cadastrado para teste:

```javascript
// Admin
{
  "email": "admin@sps.com",
  "password": "1234",
  "type": "admin"
}

```

## 🔐 Autenticação JWT

### **Headers necessários:**
```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

### **Estrutura do Token:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "nome": "User Name",
  "type": "user|admin",
  "exp": 1234567890
}
```

## 🏛️ Arquitetura Detalhada

### **Domain Layer (Domínio):**
- **Entities**: Regras de negócio centrais
- **Repository Interfaces**: Contratos para acesso a dados
- **Domain Services**: Lógica de domínio complexa

### **Application Layer (Aplicação):**
- **Use Cases**: Orquestração de regras de negócio
- **Input/Output Models**: DTOs para casos de uso

### **Infrastructure Layer (Infraestrutura):**
- **Repository Implementations**: Acesso real aos dados
- **External Services**: Integrações externas
- **Configuration**: Setup da aplicação

### **Presentation Layer (Apresentação):**
- **Controllers**: Ponte entre HTTP e Use Cases
- **DTOs**: Validação e transformação de dados
- **Middlewares**: Interceptação de requests




### Prueba NODE

- Crear un CRUD (API REST) en Node para el registro de usuarios.
- Para la creación de la prueba, utilizar un repositorio falso de usuarios (puede ser en memoria).

### Reglas

- Debe existir un usuario administrador previamente registrado para utilizar la autenticación (no es necesario cifrar la contraseña):
{
  "name": "admin",
  "email": "admin@spsgroup.com.br",
  "type": "admin",
  "password": "1234"
}

- Crear una ruta de autenticación (token Jwt).
- Las rutas de la API solo pueden ser ejecutadas si el usuario está autenticado.
- Debe ser posible añadir usuarios con los campos: email, nombre, type, password.
- No debe ser posible registrar un correo electrónico ya existente.
- Debe ser posible eliminar usuarios.
- Debe ser posible modificar los datos de un usuario.


----------------------------------
PORTUGUÊS
----------------------------------

# Teste NODE

- Criar um CRUD (API REST) em node para cadastro de usuários
- Para a criação do teste utilizar um repositório fake dos usuários. (Pode ser em memória)

## Regras

- Deve existir um usuário admin previamente cadastrado para utilizar autenticação (não precisa criptografar a senha);
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin"
    password: "1234"
  }

- Criar rota de autenticação (Jwt token)
- As rotas da API só podem ser executadas se estiver autenticada
- Deve ser possível adicionar usuários. Campos: email, nome, type, password
- Não deve ser possível cadastrar o e-mail já cadastrado
- Deve ser possível remover usuário
- Deve ser possível alterar os dados do usuário
