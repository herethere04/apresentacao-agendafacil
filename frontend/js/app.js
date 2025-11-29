// Navegação entre telas
let currentScreen = 'login';

// Dados da aplicação
const appData = {
    prestador: {
        nome: 'Carla',
        negocio: ''
    },
    servicos: [
        { id: 1, nome: 'Corte Feminino', preco: 50.00, duracao: 45, icon: '✂️' },
        { id: 2, nome: 'Manicure', preco: 30.00, duracao: 30, icon: '💅' }
    ],
    agendamentos: [
        { id: 1, horario: '09:00', cliente: 'Marina Silva', servico: 'Corte + Escova' },
        { id: 2, horario: '10:30', cliente: 'João Pedro', servico: 'Manicure' },
        { id: 3, horario: '14:00', cliente: 'LIVRE', servico: '' }
    ],
    agenda: {
        '09:00': ['ocupado', 'livre', 'livre', 'ocupado', 'ocupado', 'ocupado', 'fechado'],
        '10:00': ['ocupado', 'ocupado', 'livre', 'ocupado', 'ocupado', 'ocupado', 'fechado'],
        '11:00': ['livre', 'ocupado', 'ocupado', 'livre', 'ocupado', 'ocupado', 'fechado'],
        '14:00': ['ocupado', 'livre', 'ocupado', 'ocupado', 'livre', 'ocupado', 'fechado'],
        '15:00': ['ocupado', 'ocupado', 'ocupado', 'ocupado', 'ocupado', 'livre', 'fechado'],
        '16:00': ['livre', 'ocupado', 'livre', 'ocupado', 'ocupado', 'ocupado', 'fechado']
    }
};

// Função para navegar entre telas
function navigateTo(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenName);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;

        // Renderizar a tela apropriada
        if (screenName === 'dashboard') renderDashboard();
        if (screenName === 'servicos') renderServicos();
        if (screenName === 'calendario') renderCalendario();
        if (screenName === 'agendamento') renderAgendamento();
    }
}

// Renderizar todas as telas
function renderApp() {
    const app = document.getElementById('app');

    app.innerHTML = `
        ${renderLogin()}
        ${renderDashboardHTML()}
        ${renderServicosHTML()}
        ${renderCalendarioHTML()}
        ${renderAgendamentoHTML()}
    `;

    // Adicionar event listeners
    addEventListeners();

    // Mostrar tela inicial
    navigateTo('login');
}

// TELA 1: LOGIN
function renderLogin() {
    return `
        <div id="login" class="screen">
            <div class="login-container">
                <div class="login-card">
                    <h1 class="logo">AgendaFácil 📅</h1>
                    <p class="tagline">
                        Simplifique seus<br />
                        agendamentos
                    </p>
                    <form id="loginForm" class="login-form">
                        <input type="text" name="negocio" placeholder="Nome do Negócio" required class="input-field" />
                        <input type="email" name="email" placeholder="Seu Email" required class="input-field" />
                        <input type="password" name="senha" placeholder="Senha" required class="input-field" />
                        <input type="tel" name="telefone" placeholder="Telefone" required class="input-field" />
                        <button type="submit" class="btn-primary">Criar Conta Grátis</button>
                    </form>
                    <p class="login-link">
                        Já tem conta? <span class="link" onclick="navigateTo('dashboard')">Entre</span>
                    </p>
                    <p class="login-link" style="margin-top: 15px;">
                        <span class="link" onclick="navigateTo('agendamento')">Agendar como Cliente</span>
                    </p>
                </div>
            </div>
        </div>
    `;
}

// TELA 2: DASHBOARD
function renderDashboardHTML() {
    return `
        <div id="dashboard" class="screen">
            <div class="dashboard-container">
                <header class="dashboard-header">
                    <h1 class="dashboard-logo">AgendaFácil</h1>
                    <div class="header-actions">
                        <button class="btn-header">Perfil</button>
                        <button class="btn-header" onclick="navigateTo('login')">Sair</button>
                    </div>
                </header>
                <main class="dashboard-main">
                    <h2 class="greeting">Olá, ${appData.prestador.nome}! 👋</h2>
                    <div class="date-selector">
                        <button class="btn-nav">&lt;</button>
                        <span class="current-date">Hoje, ${new Date().toLocaleDateString('pt-BR')}</span>
                        <button class="btn-nav">&gt;</button>
                        <span>📅</span>
                    </div>
                    <div id="agendamentosList" class="agendamentos-list"></div>
                    <div class="dashboard-actions">
                        <button class="btn-action">+ Novo Agendamento</button>
                        <button class="btn-action" onclick="navigateTo('servicos')">⚙️ Gerenciar Serviços</button>
                        <button class="btn-action" onclick="navigateTo('calendario')">📊 Relatórios</button>
                        <button class="btn-action" onclick="navigateTo('agendamento')">👤 Ver Página de Agendamento (Cliente)</button>
                    </div>
                </main>
            </div>
        </div>
    `;
}

function renderDashboard() {
    const list = document.getElementById('agendamentosList');
    if (!list) return;

    list.innerHTML = appData.agendamentos.map(ag => `
        <div class="agendamento-card ${ag.cliente === 'LIVRE' ? 'livre' : ''}">
            <div class="agendamento-info">
                <span class="horario">${ag.horario}</span>
                ${ag.cliente !== 'LIVRE' ? `
                    <span> - </span>
                    <span class="cliente">${ag.cliente}</span>
                ` : `
                    <span class="cliente">${ag.cliente}</span>
                `}
            </div>
            ${ag.servico ? `
                <div class="agendamento-servico">
                    <span class="servico">${ag.servico}</span>
                    <button class="btn-confirmar" onclick="confirmarAgendamento(${ag.id})">Confirmar</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// TELA 3: SERVIÇOS
function renderServicosHTML() {
    return `
        <div id="servicos" class="screen">
            <div class="servicos-container">
                <header class="servicos-header">
                    <button class="btn-back" onclick="navigateTo('dashboard')">← Voltar</button>
                    <h1>Meus Serviços</h1>
                </header>
                <main class="servicos-main">
                    <h2>Serviços Cadastrados:</h2>
                    <div id="servicosList" class="servicos-cards"></div>

                    <h2 style="margin-top: 40px;">Novo Serviço:</h2>
                    <form id="novoServicoForm" class="novo-servico-form">
                        <input type="text" name="nome" placeholder="Nome do Serviço" required class="input-field" />
                        <div class="input-row">
                            <input type="number" name="preco" placeholder="Preço R$" step="0.01" required class="input-field input-half" />
                            <input type="number" name="duracao" placeholder="Duração (min)" required class="input-field input-half" />
                        </div>
                        <textarea name="descricao" placeholder="Descrição" rows="3" class="input-field textarea-field"></textarea>
                        <button type="submit" class="btn-salvar">Salvar Serviço</button>
                    </form>
                </main>
            </div>
        </div>
    `;
}

function renderServicos() {
    const list = document.getElementById('servicosList');
    if (!list) return;

    list.innerHTML = appData.servicos.map(serv => `
        <div class="servico-card">
            <div class="servico-header">
                <span style="font-size: 24px;">${serv.icon}</span>
                <span class="servico-nome">${serv.nome}</span>
            </div>
            <div class="servico-detalhes">
                <span class="servico-preco">R$ ${serv.preco.toFixed(2)}</span>
                <span>•</span>
                <span>${serv.duracao}min</span>
                <button class="btn-editar">Editar</button>
            </div>
        </div>
    `).join('');
}

// TELA 4: CALENDÁRIO
function renderCalendarioHTML() {
    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    return `
        <div id="calendario" class="screen">
            <div class="calendario-container">
                <header class="calendario-header">
                    <button class="btn-back" onclick="navigateTo('dashboard')">← Voltar</button>
                    <h1>Agenda da Semana</h1>
                    <div class="semana-navegacao">
                        <button class="btn-nav">&lt;</button>
                        <span style="flex: 1; font-weight: 600; color: #667eea;">Semana 25/11 - 01/12</span>
                        <button class="btn-nav">&gt;</button>
                    </div>
                </header>
                <main class="calendario-main">
                    <div class="calendario-grid">
                        <div class="grid-row">
                            <div></div>
                            ${diasSemana.map(dia => `<div class="grid-header">${dia}</div>`).join('')}
                        </div>
                        ${horarios.map(horario => `
                            <div class="grid-row">
                                <div class="horario-cell">${horario}</div>
                                ${appData.agenda[horario].map((status, i) => `
                                    <div class="agenda-cell status-${status}">
                                        ${status === 'ocupado' ? '■' : status === 'livre' ? '□' : '-'}
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>

                    <div class="legenda">
                        <div class="legenda-item">
                            <span class="agenda-cell status-ocupado" style="width: 40px; height: 40px; min-height: auto;">■</span>
                            <span>Ocupado</span>
                        </div>
                        <div class="legenda-item">
                            <span class="agenda-cell status-livre" style="width: 40px; height: 40px; min-height: auto;">□</span>
                            <span>Livre</span>
                        </div>
                        <div class="legenda-item">
                            <span class="agenda-cell status-fechado" style="width: 40px; height: 40px; min-height: auto;">-</span>
                            <span>Fechado</span>
                        </div>
                    </div>

                    <p style="text-align: center; color: #999; margin: 20px 0;">
                        Clique em um horário para ver detalhes
                    </p>

                    <button class="btn-action" style="width: 100%;">⚙️ Configurar Horários de Trabalho</button>
                </main>
            </div>
        </div>
    `;
}

function renderCalendario() {
    // Calendário é renderizado diretamente no HTML
}

// TELA 5: AGENDAMENTO CLIENTE
function renderAgendamentoHTML() {
    return `
        <div id="agendamento" class="screen">
            <div class="agendamento-container">
                <div class="agendamento-card">
                    <h1 style="text-align: center; color: #667eea; margin-bottom: 30px;">Salão da Carla 💇‍♀️</h1>

                    <form id="agendamentoForm">
                        <h2>Escolha o serviço:</h2>
                        <div id="servicosOptions"></div>

                        <h2>Escolha a data:</h2>
                        <input type="date" name="data" class="input-field" style="width: 100%;" required />

                        <h2>Horários disponíveis:</h2>
                        <div id="horariosGrid" class="horarios-grid"></div>

                        <h2>Seus dados:</h2>
                        <input type="text" name="nome" placeholder="Seu Nome" class="input-field" style="width: 100%;" required />
                        <input type="tel" name="telefone" placeholder="Telefone" class="input-field" style="width: 100%; margin-top: 12px;" required />

                        <button type="submit" class="btn-primary" style="width: 100%; margin-top: 20px;">
                            Confirmar Agendamento
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function renderAgendamento() {
    const servicosDiv = document.getElementById('servicosOptions');
    const horariosDiv = document.getElementById('horariosGrid');

    if (servicosDiv) {
        servicosDiv.innerHTML = appData.servicos.map((serv, i) => `
            <div class="servico-option ${i === 1 ? 'selected' : ''}" onclick="selecionarServico(${serv.id}, this)">
                <div class="radio-circle">${i === 1 ? '●' : '○'}</div>
                <div>
                    <div style="font-weight: 600; margin-bottom: 5px;">${serv.nome}</div>
                    <div style="color: #666; font-size: 14px;">R$ ${serv.preco.toFixed(2)} • ${serv.duracao} minutos</div>
                </div>
            </div>
        `).join('');
    }

    if (horariosDiv) {
        const horarios = ['09:00', '10:30', '14:00', '15:00', '16:30'];
        horariosDiv.innerHTML = horarios.map(h => `
            <button type="button" class="horario-btn" onclick="selecionarHorario('${h}', this)">
                ${h}
            </button>
        `).join('');
    }
}

// Funções auxiliares
function confirmarAgendamento(id) {
    alert('Agendamento ' + id + ' confirmado!');
}

function selecionarServico(id, element) {
    document.querySelectorAll('.servico-option').forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('.radio-circle').textContent = '○';
    });
    element.classList.add('selected');
    element.querySelector('.radio-circle').textContent = '●';
}

function selecionarHorario(horario, element) {
    document.querySelectorAll('.horario-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Event listeners
function addEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            appData.prestador.negocio = formData.get('negocio');
            navigateTo('dashboard');
        });
    }

    // Novo serviço form
    const servicoForm = document.getElementById('novoServicoForm');
    if (servicoForm) {
        servicoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const novoServico = {
                id: appData.servicos.length + 1,
                nome: formData.get('nome'),
                preco: parseFloat(formData.get('preco')),
                duracao: parseInt(formData.get('duracao')),
                icon: '⭐'
            };
            appData.servicos.push(novoServico);
            e.target.reset();
            renderServicos();
            alert('Serviço adicionado com sucesso!');
        });
    }

    // Agendamento form
    const agendamentoForm = document.getElementById('agendamentoForm');
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Agendamento confirmado com sucesso!');
            navigateTo('login');
        });
    }
}

// Inicializar app
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
