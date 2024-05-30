import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from './supabaseClient';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import AboutUsPage from './AboutUsPage'; // Página de información sobre la empresa
import './App.css';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error fetching session:', error.message);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark"> {/* Coloca la barra de navegación en la parte superior */}
          <Container>
            <Navbar.Brand href="/" className="me-auto">Espejos FF</Navbar.Brand> {/* Cambia el texto de la marca y alinea a la izquierda */}
            <Nav>
              <Nav.Link href="/about">Acerca de Nosotros</Nav.Link> {/* Nueva ruta para información sobre la empresa */}
              {!session && (
                <>
                  <Nav.Link href="/register">Registrarse</Nav.Link>
                  <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/login" element={session ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/register" element={session ? <Navigate to="/home" /> : <RegisterPage />} />
          <Route path="/home" element={session ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/about" element={<AboutUsPage />} /> {/* Ruta para la página de información sobre la empresa */}
          <Route path="/" element={<AboutUsPage />} /> {/* Ruta de inicio redireccionada a la página de información sobre la empresa */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;