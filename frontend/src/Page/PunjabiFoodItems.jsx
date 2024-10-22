  // src/Page/FoodItems.js
import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import NavBar from '../components/user/NavBar';

const punjabiFoodItems = [
  { id: 21, name: 'Sarson Ka Saag', description: 'Mustard greens with spices', imageUrl: 'sarsonkasaag.jpg',price : 10 },
  { id: 22, name: 'Butter Chicken', description: 'Creamy chicken curry', imageUrl: 'butterchicken.jpg',price : 10 },
  { id: 23, name: 'Aloo Paratha', description: 'Stuffed potato flatbread', imageUrl: 'alooparatha.jpg',price : 10 },
  { id: 24, name: 'Chole Bhature', description: 'Chickpea curry with fried bread', imageUrl: 'cholebhature.jpg',price : 10 },
  { id: 25, name: 'Paneer Tikka', description: 'Grilled cottage cheese skewers', imageUrl: 'paneertikka.jpg',price : 10 },
  { id: 26, name: 'Lassi', description: 'Refreshing yogurt drink', imageUrl: 'lassi.jpg',price : 10 },
  { id: 27, name: 'Rajma Chawal', description: 'Kidney bean curry with rice', imageUrl: 'rajmachawal.jpg',price : 10 },
  { id: 28, name: 'Punjabi Samosa', description: 'Deep-fried pastry filled with spiced potatoes', imageUrl: 'samosa.jpg',price : 10 },
  { id: 29, name: 'Punjabi Kadhi Pakora', description: 'Yogurt-based curry with chickpea flour dumplings', imageUrl: 'kadhipakora.jpg',price : 10 },
  {id: 30, name: 'Makki Ki Roti with Sarson Ka Saag', description: 'Cornmeal flatbread with mustard greens', imageUrl: 'makkikisarsonkasaag.jpg',price : 10 },
];

const FoodItems = () => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(punjabiFoodItems.reduce((acc, item) => {
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
        {punjabiFoodItems.map((item) => (
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
