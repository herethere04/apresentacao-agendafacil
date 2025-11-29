import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Servicos.css';

function Servicos() {
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([
    {
      id: 1,
      nome: 'Corte Feminino',
      preco: 50.00,
      duracao: 45,
      icon: '✂️'
    },
    {
      id: 2,
      nome: 'Manicure',
      preco: 30.00,
      duracao: 30,
      icon: '💅'
    }
  ]);

  const [novoServico, setNovoServico] = useState({
    nome: '',
    preco: '',
    duracao: '',
    descricao: ''
  });

  const handleChange = (e) => {
    setNovoServico({
      ...novoServico,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const servico = {
      id: servicos.length + 1,
      nome: novoServico.nome,
      preco: parseFloat(novoServico.preco),
      duracao: parseInt(novoServico.duracao),
      icon: '⭐'
    };
    setServicos([...servicos, servico]);
    setNovoServico({ nome: '', preco: '', duracao: '', descricao: '' });
  };

  const handleEditar = (id) => {
    console.log('Editar serviço:', id);
  };

  return (
    <div className="servicos-container">
      <header className="servicos-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          ← Voltar
        </button>
        <h1>Meus Serviços</h1>
      </header>

      <main className="servicos-main">
        <section className="servicos-lista">
          <h2>Serviços Cadastrados:</h2>

          <div className="servicos-cards">
            {servicos.map((servico) => (
              <div key={servico.id} className="servico-card">
                <div className="servico-header">
                  <span className="servico-icon">{servico.icon}</span>
                  <span className="servico-nome">{servico.nome}</span>
                </div>
                <div className="servico-detalhes">
                  <span className="servico-preco">R$ {servico.preco.toFixed(2)}</span>
                  <span className="separador">•</span>
                  <span className="servico-duracao">{servico.duracao}min</span>
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(servico.id)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}

            <div className="servico-card add-card">
              <div className="add-content">
                <span className="add-icon">+</span>
                <span>Adicionar Novo Serviço</span>
              </div>
            </div>
          </div>
        </section>

        <section className="novo-servico-section">
          <div className="divider"></div>

          <h2>Novo Serviço:</h2>

          <form onSubmit={handleSubmit} className="novo-servico-form">
            <input
              type="text"
              name="nome"
              placeholder="Nome do Serviço"
              value={novoServico.nome}
              onChange={handleChange}
              required
              className="input-field"
            />

            <div className="input-row">
              <input
                type="number"
                name="preco"
                placeholder="Preço R$"
                value={novoServico.preco}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                className="input-field input-half"
              />

              <input
                type="number"
                name="duracao"
                placeholder="Duração (min)"
                value={novoServico.duracao}
                onChange={handleChange}
                min="1"
                required
                className="input-field input-half"
              />
            </div>

            <textarea
              name="descricao"
              placeholder="Descrição"
              value={novoServico.descricao}
              onChange={handleChange}
              rows="3"
              className="input-field textarea-field"
            />

            <button type="submit" className="btn-salvar">
              Salvar Serviço
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Servicos;
