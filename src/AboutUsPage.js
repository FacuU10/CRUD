import React from 'react';
import { Container } from 'react-bootstrap';
import './AboutUsPage.css';
import espejosImage from './espejos.jpeg'; // Importa la imagen desde la carpeta raíz

function AboutUsPage() {
  return (
    <Container className="about-us-container mt-4">
      <h2 className="about-us-heading">Quiénes Somos</h2>
      <div className="image-container">
        <img src={espejosImage} alt="Espejos" className="center-image" /> {/* Agrega la imagen */}
      </div>
      <p className="about-us-text">
        Somos una empresa ubicada en San Miguel, Corrientes. Comenzamos nuestra actividad en el año 2019 y nos especializamos en la venta de productos diversos. Realizamos envíos a toda la provincia, brindando un servicio eficiente y de calidad a nuestros clientes.
      </p>
      <p>
        <span className="follow-us">Síguenos</span> en nuestro Instagram: <a href="https://www.instagram.com/espejosff/" target="_blank" rel="noopener noreferrer">EspejosFF</a>
      </p>
    </Container>
  );
}

export default AboutUsPage;

