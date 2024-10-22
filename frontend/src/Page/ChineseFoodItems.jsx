import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import NavBar from '../components/user/NavBar';

const chineseFoodItems = [
  { id: 11, name: 'Dim Sum', description: 'Assorted small dishes', imageUrl: 'dimsum.jpg',price: 10 },
  { id: 12, name: 'Peking Duck', description: 'Roasted duck dish', imageUrl: 'pekingduck.jpg',price: 10 },
  { id: 13, name: 'Spring Rolls', description: 'Crispy appetizers', imageUrl: 'springrolls.jpg',price: 10 },
  { id: 14, name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken', imageUrl: 'kungpaochicken.jpg',price: 10 },
  { id: 15, name: 'Mapo Tofu', description: 'Spicy tofu dish', imageUrl: 'mapotofu.jpg',price: 10 },
  { id: 16, name: 'Hot and Sour Soup', description: 'Spicy soup with mushrooms and tofu', imageUrl: 'hotandsoursoup.jpg',price: 10 },
  { id: 17, name: 'Chow Mein', description: 'Stir-fried noodles', imageUrl: 'chowmein.jpg' },
  { id: 18, name: 'Egg Rolls', description: 'Fried appetizers with vegetables and meat', imageUrl: 'eggrolls.jpg' ,price: 10},
  { id: 19, name: 'Fried Rice', description: 'Stir-fried rice with vegetables and meat', imageUrl: 'friedrice.jpg',price: 10 },
  { id: 20, name: 'Sweet and Sour Pork', description: 'Tangy pork dish', imageUrl: 'sweetandsourpork.jpg',price: 10 },
];
  
  const FoodItems = () => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(chineseFoodItems.reduce((acc, item) => {
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
          {chineseFoodItems.map((item) => (
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
  
