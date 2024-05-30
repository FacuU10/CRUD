import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { supabase, signOut } from './supabaseClient';
import './App.css';

function HomePage() {
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      showAlertMessage(error.message, "danger");
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  async function createProduct() {
    if (!description) {
      showAlertMessage("Por favor ingrese una descripción.", "warning");
      return;
    }

    try {
      const { error } = await supabase
        .from("products")
        .insert({ description })
        .single();
        
      if (error) throw error;
      showAlertMessage("¡Espejo añadido al carrito de compras!", "success");
      setDescription("");
      getProducts(); // Recargar la lista de productos
    } catch (error) {
      showAlertMessage(error.message, "danger");
    }
  }

  function showAlertMessage(message, variant) {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
    } catch (error) {
      showAlertMessage('Error al cerrar sesión', 'danger');
    }
  }

  return (
    <div className="app-container">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={handleSignOut}>Cerrar Sesión</Button>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Descripción del Espejo con Luces</h3>
            <Form onSubmit={(e) => {
              e.preventDefault();
              createProduct();
            }}>
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ingrese la descripción del espejo con luces que desea comprar"
                />
              </Form.Group>
              <Button variant="primary" type="submit">Agregar al Carrito</Button>
            </Form>
            {showAlert && <Alert variant={alertVariant} className="mt-3">{alertMessage}</Alert>}
          </Col>
        </Row>
        <hr />
        <h3>Carrito de Compras</h3>
        <Row xs={1} md={3} className="g-4">
          {products.map((product, index) => (
            <Col key={index}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;