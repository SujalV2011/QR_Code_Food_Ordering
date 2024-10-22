import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import Summary from '../components/user/Summary';
import NavBar from '../components/user/NavBar';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, placeOrder } = useContext(CartContext);

  // Function to handle placing the order
  const handlePlaceOrder = () => {
    const tableNumber = prompt("Please enter your table number:");
    
    if (!tableNumber) {
      alert('Please provide the table number.');
      return;
    }
    
    placeOrder(tableNumber); // Only pass the tableNumber
  };

  const isCartEmpty = cart.length === 0;

  return (
    <div>
      <NavBar title="La'RIVERA INN" />
      <Container>
        <Summary />
        {isCartEmpty ? (
          <Alert variant="info" className="mt-4">
            Your cart is empty. Please add items to the cart before placing an order.
          </Alert>
        ) : (
          <Row>
            {cart.map((item) => (
              <Col key={`${item.id}-${item.option}`} sm={12} md={4} lg={4}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>Price: ₹{item.price}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Card.Text>Option: {item.option}</Card.Text>
                    <div className="d-flex align-items-center">
                      <Button size="sm" variant="secondary" onClick={() => decreaseQuantity(item.id, item.option)}>-</Button>
                      <div className="mx-2">{item.quantity}</div>
                      <Button size="sm" variant="secondary" onClick={() => increaseQuantity(item.id, item.option)}>+</Button>
                    </div>
                    <Button 
                      onClick={() => removeFromCart(item.id, item.option)} 
                      variant="danger" 
                      className="w-100 mt-2"
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <Button 
          onClick={handlePlaceOrder} 
          variant="success" 
          className="w-100 mt-4" 
          disabled={isCartEmpty}
        >
          Place Order
        </Button>
      </Container>
    </div>
  );
};

export default Cart;
