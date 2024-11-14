import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import "./ChefPanel.css";

const ChefPanel = () => {
  const [orders, setOrders] = useState([]);  // State to store the fetched orders
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/all');
        if (response.status === 200 && response.data && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);  // Set the fetched orders
        }
      } catch (error) {
        setError('Failed to fetch orders');  // Handle error if fetching fails
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched
      }
    };

    fetchOrders();  // Fetch orders when the component mounts
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Chef Panel</h2>
      {loading ? (
        <p>Loading orders...</p>  // Show loading message while fetching data
      ) : error ? (
        <p>{error}</p>  // Show error message if fetching fails
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>  // Show message if no orders are available
      ) : (
        <Row>
          {orders.map((order, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Table Number: {order.tableNumber}</Card.Title>
                  {/* <Card.Text>Customer Name: {order.customerName}</Card.Text>
                  <Card.Text>Order Date: {order.orderDate}</Card.Text> */}
                  <h6>Ordered Items:</h6>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                  {/* <Card.Text>Total Amount: ₹{order.totalAmount}</Card.Text> */}
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
