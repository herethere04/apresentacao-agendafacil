import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());

  // Dados de exemplo dos agendamentos
  const [agendamentos] = useState([
    {
      id: 1,
      horario: '09:00',
      cliente: 'Marina Silva',
      servico: 'Corte + Escova',
      confirmado: false
    },
    {
      id: 2,
      horario: '10:30',
      cliente: 'João Pedro',
      servico: 'Manicure',
      confirmado: false
    },
    {
      id: 3,
      horario: '14:00',
      cliente: 'LIVRE',
      servico: '',
      confirmado: false
    }
  ]);

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const handleConfirmar = (id) => {
    console.log('Confirmar agendamento:', id);
  };

  const handleSair = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-logo">AgendaFácil</h1>
        <div className="header-actions">
          <button className="btn-header">Perfil</button>
          <button className="btn-header" onClick={handleSair}>Sair</button>
        </div>
      </header>

      <main className="dashboard-main">
        <h2 className="greeting">Olá, Carla! 👋</h2>

        <div className="date-selector">
          <button className="btn-nav">&lt;</button>
          <span className="current-date">Hoje, {formatDate(currentDate)}</span>
          <button className="btn-nav">&gt;</button>
          <span className="calendar-icon">📅</span>
        </div>

        <div className="agendamentos-list">
          {agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className={`agendamento-card ${agendamento.cliente === 'LIVRE' ? 'livre' : ''}`}
            >
              <div className="agendamento-info">
                <span className="horario">{agendamento.horario}</span>
                {agendamento.cliente !== 'LIVRE' ? (
                  <>
                    <span className="separador">-</span>
                    <span className="cliente">{agendamento.cliente}</span>
                  </>
                ) : (
                  <span className="cliente-livre">{agendamento.cliente}</span>
                )}
              </div>
              {agendamento.servico && (
                <div className="agendamento-servico">
                  <span className="servico">{agendamento.servico}</span>
                  <button
                    className="btn-confirmar"
                    onClick={() => handleConfirmar(agendamento.id)}
                  >
                    Confirmar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="dashboard-actions">
          <button className="btn-action">
            + Novo Agendamento
          </button>
          <button
            className="btn-action"
            onClick={() => navigate('/servicos')}
          >
            ⚙️ Gerenciar Serviços
          </button>
          <button
            className="btn-action"
            onClick={() => navigate('/calendario')}
          >
            📊 Relatórios
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
