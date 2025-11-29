import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendario.css';

function Calendario() {
  const navigate = useNavigate();

  // Dados de exemplo da agenda semanal
  const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  // Estado dos horários (■ ocupado, □ livre, - fechado)
  const [agenda] = useState({
    '09:00': ['ocupado', 'livre', 'livre', 'ocupado', 'ocupado', 'ocupado', 'fechado'],
    '10:00': ['ocupado', 'ocupado', 'livre', 'ocupado', 'ocupado', 'ocupado', 'fechado'],
    '11:00': ['livre', 'ocupado', 'ocupado', 'livre', 'ocupado', 'ocupado', 'fechado'],
    '14:00': ['ocupado', 'livre', 'ocupado', 'ocupado', 'livre', 'ocupado', 'fechado'],
    '15:00': ['ocupado', 'ocupado', 'ocupado', 'ocupado', 'ocupado', 'livre', 'fechado'],
    '16:00': ['livre', 'ocupado', 'livre', 'ocupado', 'ocupado', 'ocupado', 'fechado']
  });

  const [semanaAtual] = useState('25/11 - 01/12');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ocupado':
        return '■';
      case 'livre':
        return '□';
      case 'fechado':
        return '-';
      default:
        return '□';
    }
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const handleCelulaClick = (horario, dia, status) => {
    if (status !== 'fechado') {
      console.log(`Clicou em ${diasSemana[dia]} às ${horario} - Status: ${status}`);
    }
  };

  return (
    <div className="calendario-container">
      <header className="calendario-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          ← Voltar
        </button>
        <h1>Agenda da Semana</h1>
        <div className="semana-navegacao">
          <button className="btn-nav">&lt;</button>
          <span className="semana-atual">Semana {semanaAtual}</span>
          <button className="btn-nav">&gt;</button>
        </div>
      </header>

      <main className="calendario-main">
        <div className="calendario-grid-container">
          <div className="calendario-grid">
            {/* Cabeçalho com dias da semana */}
            <div className="grid-header">
              <div className="header-cell"></div>
              {diasSemana.map((dia, index) => (
                <div key={index} className="header-cell dia-semana">
                  {dia}
                </div>
              ))}
            </div>

            {/* Linhas de horários */}
            {horarios.map((horario) => (
              <div key={horario} className="grid-row">
                <div className="horario-cell">{horario}</div>
                {agenda[horario].map((status, diaIndex) => (
                  <div
                    key={diaIndex}
                    className={`agenda-cell ${getStatusClass(status)}`}
                    onClick={() => handleCelulaClick(horario, diaIndex, status)}
                  >
                    {getStatusIcon(status)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="legenda">
          <div className="legenda-item">
            <span className="legenda-icon status-ocupado">■</span>
            <span>Ocupado</span>
          </div>
          <div className="legenda-item">
            <span className="legenda-icon status-livre">□</span>
            <span>Livre</span>
          </div>
          <div className="legenda-item">
            <span className="legenda-icon status-fechado">-</span>
            <span>Fechado</span>
          </div>
        </div>

        <p className="dica">Clique em um horário para ver detalhes</p>

        <button className="btn-configurar" onClick={() => console.log('Configurar horários')}>
          ⚙️ Configurar Horários de Trabalho
        </button>
      </main>
    </div>
  );
}

export default Calendario;
