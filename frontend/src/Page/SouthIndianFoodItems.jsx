// src/components/SouthIndianFoodItems.js
import React, { useContext, useEffect, useState } from 'react';
import './FoodItem.css'; // Assuming you have some custom styles
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { CartContext } from '../context/CartContext'; // Adjust this path as needed
import NavBar from '../components/user/NavBar'; // Adjust this path as needed
import axios from 'axios';

const SouthIndianFoodItems = () => {
  const { addToCart } = useContext(CartContext);
  const [foodItems, setFoodItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menuitems?category=south-indian');
        console.log(response.data); // Check the structure of your data
        setFoodItems(response.data);
        const initialQuantity = response.data.reduce((acc, item) => {
          acc[item._id] = 0; // Assuming your API uses _id as the identifier
          return acc;
        }, {});
        setQuantity(initialQuantity);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const handleAddToCart = (option) => {
    if (quantity[selectedItem._id] > 0) {
      const itemToAdd = {
        id: selectedItem._id,
        name: selectedItem.itemName,    // Make sure this matches your API response
        price: selectedItem.itemPrice,   // Make sure this matches your API response
        quantity: quantity[selectedItem._id],
        option,
        imageUrl: selectedItem.itemImage // Make sure this matches your API response
      };
      addToCart(itemToAdd);
      setSelectedItem(null);
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [itemId]: prevQuantity[itemId] + 1
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [itemId]: prevQuantity[itemId] > 0 ? prevQuantity[itemId] - 1 : 0
    }));
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <NavBar title="La'RIVERA INN" />
      <Container>
        <Row>
          {foodItems.map(item => (
            <Col key={item._id} sm={12} md={4} lg={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={`${item.itemImage}`} />
                <Card.Body>
                  <Card.Title>{item.itemName}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ₹{item.itemPrice}</Card.Text>
                  <Form.Group controlId={`quantity-${item._id}`} className="mb-3">
                    <Form.Label>Quantity:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Button size="sm" variant="secondary" onClick={() => handleDecreaseQuantity(item._id)}>-</Button>
                      <Form.Control
                        type="number"
                        value={quantity[item._id]}
                        onChange={(e) => setQuantity({ ...quantity, [item._id]: parseInt(e.target.value) || 0 })}
                        className="mx-2 text-center"
                        style={{ width: '50px' }}
                      />
                      <Button size="sm" variant="secondary" onClick={() => handleIncreaseQuantity(item._id)}>+</Button>
                    </div>
                  </Form.Group>
                  <Button onClick={() => handleSelectItem(item)} variant="primary" className="w-100">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {selectedItem && (
          <Modal show={true} onHide={() => setSelectedItem(null)}>
            <Modal.Header closeButton>
              <Modal.Title>Choose Option for {selectedItem.itemName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Would you like your {selectedItem.itemName} with oil or butter?</p>
              <div className="button-group">
                <Button onClick={() => handleAddToCart('oil')} variant="success">With Oil</Button>
                <Button onClick={() => handleAddToCart('butter')} variant="success">With Butter</Button>
                <Button onClick={() => setSelectedItem(null)} variant="secondary">Cancel</Button>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default SouthIndianFoodItems;
