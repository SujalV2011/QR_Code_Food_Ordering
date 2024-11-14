import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import NavBar from './AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newQuantity, setNewQuantity] = useState(null);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/all');
      if (response.status === 200 && response.data && Array.isArray(response.data.orders)) {
        const ordersWithPrices = await Promise.all(
          response.data.orders.map(async (order) => {
            const itemsWithPrices = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const menuItemResponse = await axios.get(`http://localhost:5000/api/menuitems/${item.name}`);
                  const itemPrice = menuItemResponse.data.itemPrice;
                  return {
                    ...item,
                    price: itemPrice,
                    totalPrice: item.quantity * itemPrice,
                  };
                } catch (error) {
                  console.error(`Error fetching price for ${item.name}: ${error}`);
                  return { ...item, price: null, totalPrice: null };
                }
              })
            );
            return {
              ...order,
              items: itemsWithPrices,
              totalAmount: itemsWithPrices.reduce(
                (sum, item) => sum + (item.totalPrice || 0), 0
              ),
            };
          })
        );
        setOrders(ordersWithPrices);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching all orders:', error);
    }
  };

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleApprove = async (orderId) => {
    if (!selectedOrder) return;
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/approve`);
      console.log(`Order ${orderId} approved`);
      setShowModal(false);
      fetchAllOrders();
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  const handleEditQuantity = (index, quantity) => {
    if (quantity < 0) return;
    setNewQuantity({ index, quantity });
  };

  const handleSaveChanges = async () => {
    if (!selectedOrder || newQuantity === null) return;

    const updatedItems = selectedOrder.items.map((item, index) =>
      index === newQuantity.index ? { ...item, quantity: newQuantity.quantity } : item
    );
    const updatedOrder = { ...selectedOrder, items: updatedItems };

    try {
      await axios.put(`http://localhost:5000/api/orders/${selectedOrder._id}`, updatedOrder);
      console.log('Quantity updated:', newQuantity.quantity);
      setShowModal(false);
      fetchAllOrders();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleRemoveItem = async (index) => {
    if (!selectedOrder) return;

    const updatedItems = selectedOrder.items.filter((_, i) => i !== index);
    const updatedOrder = { ...selectedOrder, items: updatedItems };

    try {
      await axios.put(`http://localhost:5000/api/orders/${selectedOrder._id}`, updatedOrder);
      console.log('Order item removed');
      setShowModal(false);
      fetchAllOrders();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotalAmount = (order) => {
    return order.items.reduce((total, item) => total + (item.quantity * (item.price || 0)), 0);
  };

  return (
    <div>
      <NavBar title="La'RIVERA INN" />
      <Container className="mt-5">
        <Row>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Col key={order.tableNumber} sm={12} md={6} lg={4} xl={2}>
                <Card
                  className="mb-4"
                  onClick={() => handleCardClick(order)}
                  style={{
                    borderRadius: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    height: '150px',
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
            ))
          ) : (
            <Col>
              <h4 className="text-center">No orders available</h4>
            </Col>
          )}
        </Row>
      </Container>

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
                    {item.name} - Quantity: {item.quantity} - Price per Item: ₹{item.price || 0}
                    <Form.Group controlId={`formQuantity-${index}`} style={{ display: 'inline-block', width: '60%' }}>
                      <Form.Control
                        type="number"
                        value={newQuantity?.index === index ? newQuantity.quantity : item.quantity}
                        onChange={(e) => handleEditQuantity(index, parseInt(e.target.value, 10))}
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
          {selectedOrder && (
            <Button variant="success" onClick={() => handleApprove(selectedOrder._id)}>
              Approve
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
