# AgendaFácil - Frontend

Sistema de agendamento online para prestadores de serviços.

## Telas Implementadas

1. **Login/Cadastro do Prestador** - Tela de entrada no sistema
2. **Dashboard do Prestador** - Visualização dos agendamentos do dia
3. **Cadastro de Serviços** - Gerenciamento dos serviços oferecidos
4. **Calendário Semanal** - Visualização da agenda da semana
5. **Agendamento (Visão do Cliente)** - Interface para clientes agendarem

## Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

### Executar o Projeto

```bash
npm start
```

O projeto será aberto automaticamente no navegador em `http://localhost:3000`

## Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── Dashboard.js
│   │   ├── Dashboard.css
│   │   ├── Servicos.js
│   │   ├── Servicos.css
│   │   ├── Calendario.js
│   │   ├── Calendario.css
│   │   ├── AgendamentoCliente.js
│   │   └── AgendamentoCliente.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Rotas Disponíveis

- `/login` - Tela de login/cadastro
- `/dashboard` - Dashboard do prestador
- `/servicos` - Gerenciamento de serviços
- `/calendario` - Calendário semanal
- `/agendar/:prestadorId` - Tela de agendamento do cliente

## Tecnologias Utilizadas

- React 18
- React Router DOM 6
- CSS3 com design responsivo
- Componentes funcionais com Hooks

## Próximos Passos

- Integração com backend/API
- Autenticação de usuários
- Persistência de dados
- Notificações em tempo real
- Sistema de confirmação por SMS/Email
