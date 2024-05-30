import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else if (!data.user.confirmed_at) {
      setInfo('Correo electrónico no confirmado. Por favor, revisa tu correo electrónico.');
    } else {
      navigate('/home');
    }
  };

  const handleResendConfirmation = async () => {
    const { error } = await supabase.auth.api.resendEmailConfirmation(email);
    if (error) {
      setError(error.message);
    } else {
      setInfo('Correo de confirmación reenviado. Por favor, revisa tu correo electrónico.');
    }
  };

  return (
    <Container className="login-container">
      <div className="light-focus"></div>
      <h2 className="login-heading">Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {info && <Alert variant="info">{info}</Alert>}
      <Form onSubmit={handleLogin} className="login-form">
        <Form.Group controlId="formBasicEmail" className="login-input">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="login-input">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="login-button">Iniciar Sesión</Button>
      </Form>
      {info === 'Correo electrónico no confirmado. Por favor, revisa tu correo electrónico.' && (
        <Button variant="secondary" onClick={handleResendConfirmation} className="mt-3">
          Reenviar Correo de Confirmación
        </Button>
      )}
    </Container>
  );
}

export default LoginPage;


