import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import NavBar from '../components/user/NavBar';

const pizzaFoodItems = [
  { id: 31, name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and basil pizza', imageUrl: 'margherita.jpg',price: 10 },
  { id: 32, name: 'Pepperoni Pizza', description: 'Pizza topped with pepperoni slices', imageUrl: 'pepperoni.jpg',price: 10 },
  { id: 33, name: 'Vegetarian Pizza', description: 'Pizza loaded with assorted vegetables', imageUrl: 'vegetarian.jpg',price: 10 },
  { id: 34, name: 'Hawaiian Pizza', description: 'Pizza with pineapple, ham, and cheese', imageUrl: 'hawaiian.jpg',price: 10 },
  { id: 35, name: 'BBQ Chicken Pizza', description: 'Pizza topped with BBQ chicken pieces', imageUrl: 'bbqchicken.jpg',price: 10 },
  { id: 36, name: 'Buffalo Chicken Pizza', description: 'Spicy buffalo sauce with chicken on a pizza', imageUrl: 'buffalochicken.jpg',price: 10 },
  { id: 37, name: 'Mushroom Pizza', description: 'Pizza with savory mushrooms', imageUrl: 'mushroom.jpg',price: 10 },
  { id: 38, name: 'Four Cheese Pizza', description: 'Pizza topped with four types of cheese', imageUrl: 'fourcheese.jpg',price: 10 },
  { id: 39, name: 'Spinach and Feta Pizza', description: 'Pizza with spinach and feta cheese', imageUrl: 'spinachfeta.jpg',price: 10 },
  { id: 40, name: 'Supreme Pizza', description: 'Loaded pizza with assorted toppings', imageUrl: 'supreme.jpg',price: 10 },
];
  
  const FoodItems = () => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(pizzaFoodItems.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {}));
  
    const handleAddToCart = (item) => {
      if (quantity[item.id] > 0) {
        addToCart(item, quantity[item.id]);
        }
    };
  
    const increaseQuantity = (itemId) => {
      setQuantity(prevQuantity => ({
        ...prevQuantity,
        [itemId]: prevQuantity[itemId] + 1
      }));
    };
  
    const decreaseQuantity = (itemId) => {
      setQuantity(prevQuantity => ({
        ...prevQuantity,
        [itemId]: prevQuantity[itemId] > 0 ? prevQuantity[itemId] - 1 : 0
      }));
    };
  
    return (
      <div>
        <NavBar title="La'RIVERA INN" />
      <Container>
        <Row>
          {pizzaFoodItems.map((item) => (
            <Col key={item.id} sm={12} md={4} lg={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Form.Group controlId={`quantity-${item.id}`} className="mb-3">
                    <Form.Label>Quantity:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Button size="sm" variant="secondary" onClick={() => decreaseQuantity(item.id)}>-</Button>
                      <Form.Control
                        type="number"
                        value={quantity[item.id]}
                        onChange={(e) => setQuantity({ ...quantity, [item.id]: parseInt(e.target.value) || 1 })}
                        className="mx-2 text-center"
                        style={{ width: '50px' }}
                      />
                      <Button size="sm" variant="secondary" onClick={() => increaseQuantity(item.id)}>+</Button>
                    </div>
                  </Form.Group>
                  <Button onClick={() => handleAddToCart(item)} variant="primary" className="w-100">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </div>
    );
  };
  
  export default FoodItems;
  