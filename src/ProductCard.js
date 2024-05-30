import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { deleteProduct, updateProduct } from './supabaseClient';

function ProductCard({ product, onProductDeleted, onProductUpdated }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDescription, setNewDescription] = useState(product.descripcion);

  const handleDelete = async () => {
    await deleteProduct(product.id);
    onProductDeleted(product.id);
  };

  const handleEdit = async () => {
    await updateProduct(product.id, newDescription);
    onProductUpdated(product.id, newDescription);
    setShowEditModal(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text>{product.descripcion}</Card.Text>
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

