import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Servicos from './pages/Servicos';
import Calendario from './pages/Calendario';
import AgendamentoCliente from './pages/AgendamentoCliente';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/agendar/:prestadorId" element={<AgendamentoCliente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
