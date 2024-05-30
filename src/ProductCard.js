import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { deleteProduct, updateProduct } from './supabaseClient';

function ProductCard({ product, onProductDeleted, onProductUpdated }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDescription, setNewDescription] = useState(product.description);

  const handleDelete = async () => {
    try {
    await deleteProduct(product.productos);
     } catch (error) {
      console.error('error al manejar la eliminacion del producto', error);
     }
  };

  const handleEdit = async () => {
    await updateProduct(product.productos, newDescription);
    setShowEditModal(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        <Button variant="primary" onClick={() => setShowEditModal(true)}>Editar</Button>
      </Card.Body>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleEdit}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default ProductCard;

