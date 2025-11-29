import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AgendamentoCliente.css';

function AgendamentoCliente() {
  const { prestadorId } = useParams();

  const [servicos] = useState([
    {
      id: 1,
      nome: 'Corte Feminino',
      preco: 50.00,
      duracao: 45
    },
    {
      id: 2,
      nome: 'Manicure',
      preco: 30.00,
      duracao: 30
    }
  ]);

  const [horariosDisponiveis] = useState([
    '09:00', '10:30', '14:00', '15:00', '16:30'
  ]);

  const [formData, setFormData] = useState({
    servicoId: 2,
    data: '2025-11-28',
    horario: '',
    nome: '',
    telefone: ''
  });

  const handleServicoChange = (servicoId) => {
    setFormData({
      ...formData,
      servicoId: servicoId
    });
  };

  const handleHorarioClick = (horario) => {
    setFormData({
      ...formData,
      horario: horario
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Agendamento confirmado:', formData);
    alert('Agendamento confirmado com sucesso!');
  };

  const servicoSelecionado = servicos.find(s => s.id === formData.servicoId);

  return (
    <div className="agendamento-container">
      <div className="agendamento-card">
        <header className="agendamento-header">
          <h1>Salão da Carla 💇‍♀️</h1>
        </header>

        <form onSubmit={handleSubmit} className="agendamento-form">
          <section className="form-section">
            <h2>Escolha o serviço:</h2>

            <div className="servicos-lista">
              {servicos.map((servico) => (
                <div
                  key={servico.id}
                  className={`servico-option ${formData.servicoId === servico.id ? 'selected' : ''}`}
                  onClick={() => handleServicoChange(servico.id)}
                >
                  <div className="radio-circle">
                    {formData.servicoId === servico.id ? '●' : '○'}
                  </div>
                  <div className="servico-info">
                    <div className="servico-nome">{servico.nome}</div>
                    <div className="servico-detalhes">
                      R$ {servico.preco.toFixed(2)} • {servico.duracao} minutos
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="form-section">
            <h2>Escolha a data:</h2>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
              required
              className="date-input"
            />
          </section>

          <section className="form-section">
            <h2>Horários disponíveis:</h2>
            <div className="horarios-grid">
              {horariosDisponiveis.map((horario) => (
                <button
                  key={horario}
                  type="button"
                  className={`horario-btn ${formData.horario === horario ? 'selected' : ''}`}
                  onClick={() => handleHorarioClick(horario)}
                >
                  {horario}
                </button>
              ))}
            </div>
          </section>

          <section className="form-section">
            <h2>Seus dados:</h2>
            <input
              type="text"
              name="nome"
              placeholder="Seu Nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="input-field"
            />
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </section>

          <button
            type="submit"
            className="btn-confirmar-agendamento"
            disabled={!formData.horario}
          >
            Confirmar Agendamento
          </button>
        </form>

        {servicoSelecionado && formData.horario && (
          <div className="resumo-agendamento">
            <h3>Resumo do Agendamento:</h3>
            <p><strong>Serviço:</strong> {servicoSelecionado.nome}</p>
            <p><strong>Data:</strong> {new Date(formData.data + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
            <p><strong>Horário:</strong> {formData.horario}</p>
            <p><strong>Valor:</strong> R$ {servicoSelecionado.preco.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgendamentoCliente;
