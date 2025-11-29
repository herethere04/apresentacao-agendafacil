import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeNegocio: '',
    email: '',
    senha: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de cadastro/login
    console.log('Dados do formulário:', formData);
    // Navegar para o dashboard após o cadastro
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">AgendaFácil 📅</h1>

        <p className="tagline">
          Simplifique seus<br />
          agendamentos
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="nomeNegocio"
            placeholder="Nome do Negócio"
            value={formData.nomeNegocio}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="email"
            name="email"
            placeholder="Seu Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            className="input-field"
          />

          <button type="submit" className="btn-primary">
            Criar Conta Grátis
          </button>
        </form>

        <p className="login-link">
          Já tem conta? <span className="link">Entre</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
