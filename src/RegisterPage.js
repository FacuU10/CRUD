import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import './RegisterPage.css'; // Importar el archivo CSS

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else navigate('/login');
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6}>
          <div className="register-box">
            <h2 className="text-center my-4">Registrarse</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-3">
                <Button variant="primary" size="lg" type="submit">Registrarse</Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;