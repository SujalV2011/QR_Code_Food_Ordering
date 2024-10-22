import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import NavBar from './AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  const [orders, setOrders] = useState([
    { id: 1, tableNumber: 1, items: [{ itemName: 'Dosa', quantity: 3, pricePerItem: 60 }] },
    { id: 2, tableNumber: 2, items: [{ itemName: 'Idli', quantity: 2, pricePerItem: 30 }] },
    { id: 3, tableNumber: 3, items: [{ itemName: 'Sambar', quantity: 1, pricePerItem: 40 }] },
    { id: 4, tableNumber: 4, items: [{ itemName: 'Vada', quantity: 1, pricePerItem: 50 }] },
    { id: 5, tableNumber: 5, items: [{ itemName: 'Puri', quantity: 4, pricePerItem: 20 }] },
    { id: 6, tableNumber: 6, items: [{ itemName: 'Biryani', quantity: 1, pricePerItem: 100 }] },
    { id: 7, tableNumber: 7, items: [{ itemName: 'Pizza', quantity: 2, pricePerItem: 150 }] },
    { id: 8, tableNumber: 8, items: [{ itemName: 'Burger', quantity: 2, pricePerItem: 80 }] },
    { id: 9, tableNumber: 9, items: [{ itemName: 'Pasta', quantity: 1, pricePerItem: 120 }] },
    { id: 10, tableNumber: 10, items: [{ itemName: 'Salad', quantity: 3, pricePerItem: 50 }] },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState(null);

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleApprove = (orderId) => {
    console.log(`Order ${orderId} approved`);
    setShowModal(false); // Close modal after approval
  };

  const handleEditQuantity = (index, quantity) => {
    setNewQuantity({ index, quantity });
  };

  const handleSaveChanges = () => {
    if (selectedOrder && newQuantity) {
      const updatedItems = selectedOrder.items.map((item, index) =>
        index === newQuantity.index ? { ...item, quantity: newQuantity.quantity } : item
      );
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, items: updatedItems } : order
      );
      setOrders(updatedOrders);
      console.log('Quantity updated:', newQuantity.quantity);
      setShowModal(false);
    }
  };

  const handleRemoveItem = (index) => {
    if (selectedOrder) {
      const updatedItems = selectedOrder.items.filter((_, i) => i !== index);
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, items: updatedItems } : order
      );
      setOrders(updatedOrders);
      console.log('Order item removed');
      setShowModal(false);
    }
  };

  // Function to calculate total amount for the order
  const calculateTotalAmount = (order) => {
    return order.items.reduce((total, item) => total + item.quantity * item.pricePerItem, 0);
  };

  return (
    <div>
      <NavBar title="La'RIVERA INN" />
      <Container className="mt-5">
        <Row>
          {orders.map((order) => (
            <Col key={order.id} sm={12} md={6} lg={4} xl={2}> {/* Adjusted to make 5 cards in a row */}
              <Card
                className="mb-4"
                onClick={() => handleCardClick(order)}
                style={{
                  borderRadius: '15px', // Make corners rounded
                  display: 'flex', // Use flexbox for centering
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Optional shadow for card
                  height: '150px', // Set a fixed height for the card
                }}
              >
                <Card.Body>
                  <Card.Title style={{ margin: '0', fontSize: '1.2em' }}>
                    Table: {order.tableNumber}
                  </Card.Title>
                  <Card.Text style={{ margin: '0' }}>
                    Total: ₹{calculateTotalAmount(order)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for showing order details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>Table Number: {selectedOrder.tableNumber}</p>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.itemName} - Quantity: {item.quantity} - Price per Item: ₹{item.pricePerItem}
                    <Form.Group controlId={`formQuantity-${index}`} style={{ display: 'inline-block', width: '60%' }}>
                      <Form.Control
                        type="number"
                        value={newQuantity?.index === index ? newQuantity.quantity : item.quantity}
                        onChange={(e) => handleEditQuantity(index, e.target.value)}
                        style={{ display: 'inline-block', width: '60%' }}
                      />
                      <Button variant="link" onClick={() => handleRemoveItem(index)} style={{ padding: 0 }}>
                        <FontAwesomeIcon icon={faTrash} style={{ color: '#FF7F7F', width: '30px', height: '30px', marginLeft: '10px' }} />
                      </Button>
                    </Form.Group>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="success" onClick={() => handleApprove(selectedOrder.id)}>
            Approve
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
