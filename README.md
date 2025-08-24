# SPS Group Challenge

## 🚀 Projeto Full-Stack

Este repositório contém a solução completa para o **SPS Group Challenge**, implementando um sistema de gestão de usuários com autenticação JWT, desenvolvido com **Clean Architecture** no backend e **React TypeScript** no frontend.


## 📋 Visão Geral

O projeto consiste em:

- **Backend**: API RESTful com Express.js + TypeScript + Clean Architecture
- **Frontend**: SPA React com TypeScript + Context API + Custom Hooks

### **Funcionalidades Principais:**
- Sistema de autenticação JWT
- CRUD completo de usuários
- Rotas protegidas
- Estado global gerenciado

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐       ┌─────────────────┐
│   Frontend      │ HTTP  │    Backend      │
│   (React)       │◄─────►│   (Express)     │
│                 │ API   │                 │
├─────────────────┤       ├─────────────────┤
│ • React 18      │       │ • Clean Arch    │
│ • TypeScript    │       │ • SOLID         │
│ • Context API   │       │ • JWT Auth      │
│ • Custom Hooks  │       │ • TypeScript    │
│ • Protected     │       │ • Express.js    │
│   Routes        │       │ • In-Memory DB  │
└─────────────────┘       └─────────────────┘
```

## 📁 Estrutura do Projeto

```
sps-group-challenge/
├── test-sps-server/          # Backend API
│   ├── src/
│   │   ├── domain/           # Entidades e regras de negócio
│   │   ├── application/      # Casos de uso
│   │   ├── infrastructure/   # Implementações externas
│   │   ├── presentation/     # Controllers e DTOs
│   │   └── shared/           # Recursos compartilhados
│   ├── README.md            # Documentação do backend
│   └── package.json
├── test-sps-react/          # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── hooks/           # Custom hooks
│   │   ├── contexts/        # Estado global
│   │   ├── services/        # Comunicação com API
│   │   ├── types/           # Definições TypeScript
│   │   └── utils/           # Utilitários
│   ├── README.md           # Documentação do frontend
│   └── package.json
└── README.md               # Este arquivo
```

## 🚀 Quick Start

### **1. Clone o Repositório:**
```bash
git clone https://github.com/LegendarioP/sps-group-challenge.git
cd "sps-group-challenge"
```

### **2. Setup Backend:**
```bash
cd test-sps-server
npm install
npm run dev
```
🌐 Backend rodando em: http://localhost:3001

### **3. Setup Frontend:**
```bash
cd ../test-sps-react
npm install
npm start
```
🌐 Frontend rodando em: http://localhost:3000

### **4. Acesso ao Sistema:**
- **Admin**: admin@sps.com / 1234


## 🛠️ Tecnologias Utilizadas

### **Backend:**
- Express.js - Framework web
- TypeScript - Tipagem estática
- JWT - Autenticação
- bcrypt - Hash de senhas
- Clean Architecture - Padrão arquitetural
- SOLID - Princípios de design

### **Frontend:**
- React 18 - UI Library
- TypeScript - Tipagem estática
- React Router - Roteamento
- Context API - Estado global
- React Hook Form - Formulários
- Axios - Cliente HTTP
- Custom Hooks - Lógica reutilizável

## 📚 Documentação Detalhada

### **Backend (API):**
📖 [Documentação Completa do Backend](./test-sps-server/README.md)
- Arquitetura Clean + SOLID
- Endpoints da API
- Autenticação JWT
- Casos de uso implementados

### **Frontend (React):**
📖 [Documentação Completa do Frontend](./test-sps-react/README.md)
- Arquitetura de componentes
- Custom hooks
- Sistema de roteamento
- Gerenciamento de estado

## 🎯 Decisões Arquiteturais

### **Por que Clean Architecture no Backend?**

1. **Separação de Responsabilidades**: Cada camada tem função específica
2. **Independência de Framework**: Domínio não depende do Express
3. **Testabilidade**: Fácil de testar isoladamente
4. **Manutenibilidade**: Mudanças não propagam entre camadas
5. **Escalabilidade**: Preparado para crescimento

### **Por que essa estrutura no Frontend?**

1. **Componentes Reutilizáveis**: Máxima reutilização de código
2. **Custom Hooks**: Lógica de negócio encapsulada
3. **Context API**: Estado global simples e eficiente
4. **Service Layer**: Abstração da comunicação com API
5. **Type Safety**: TypeScript em todos os níveis
