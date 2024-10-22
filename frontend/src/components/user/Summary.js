import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import './Summary.css'; // Import the CSS file

const Summary = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <Card className="summary-card no-hover">
      <Card.Header>Summary</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Total Items:</strong> {totalItems}
        </Card.Text>
        <Card.Text>
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Summary;
