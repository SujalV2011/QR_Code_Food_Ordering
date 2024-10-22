import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const ChefPanel = () => {
  const { tableOrders } = useContext(CartContext); // Access tableOrders

  return (
    <Container>
      <h2 className="mt-4">Chef Panel</h2>
      {tableOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <Row>
          {tableOrders.map((order, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Table Number: {order.tableNumber}</Card.Title>
                  <Card.Text>Customer Name: {order.customerName}</Card.Text>
                  <Card.Text>Order Date: {order.orderDate}</Card.Text>
                  <h6>Ordered Items:</h6>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - Quantity: {item.quantity} (Option: {item.option})
                      </li>
                    ))}
                  </ul>
                  <Card.Text>Total Amount: ${order.totalAmount}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ChefPanel;
