import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import NavBar from './NavBar';
import './HomePageCard.css';

const HomePageCard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useContext(CartContext);

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/menuitems');
        setMenuItems(data);
        
        // Initialize quantity for each menu item
        const initialQuantity = data.reduce((acc, item) => {
          acc[item._id] = 0;
          return acc;
        }, {});
        setQuantity(initialQuantity);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Increase quantity for a specific menu item
  const handleQuantityChange = (itemId, increment) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] + increment, 0),
    }));
  };

  // Select an item to add to the cart
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Add the selected item to the cart with the selected option (oil or butter)
  const handleAddToCart = (option) => {
    const itemQuantity = quantity[selectedItem._id];
    if (itemQuantity > 0) {
      const cartItem = {
        id: selectedItem._id,
        name: selectedItem.itemName,
        price: selectedItem.itemPrice,
        quantity: itemQuantity,
        option, // Include the selected option (oil or butter)
        imageUrl: selectedItem.itemImage,
      };

      // Add to the cart without sending to backend
      addToCart(cartItem);
      setSelectedItem(null);
    }
  };

  return (
    <div>
      <NavBar title="La'RIVERA INN" />
      <Container>
        <Row>
          {menuItems.length === 0 ? (
            <p>No menu items available</p>
          ) : (
            menuItems.map((item) => (
              <Col key={item._id} sm={12} md={4} lg={4}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={item.itemImage} />
                  <Card.Body>
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>Price: ₹{item.itemPrice}</Card.Text>
                    <Form.Group controlId={`quantity-${item._id}`} className="mb-3">
                      <Form.Label>Quantity:</Form.Label>
                      <div className="d-flex align-items-center">
                        <Button size="sm" variant="secondary" onClick={() => handleQuantityChange(item._id, -1)}>
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          value={quantity[item._id]}
                          onChange={(e) =>
                            setQuantity({ ...quantity, [item._id]: parseInt(e.target.value) || 1 })
                          }
                          className="mx-2 text-center"
                          style={{ width: '50px' }}
                        />
                        <Button size="sm" variant="secondary" onClick={() => handleQuantityChange(item._id, 1)}>
                          +
                        </Button>
                      </div>
                    </Form.Group>
                    <Button
                      onClick={() => handleSelectItem(item)}
                      variant="primary"
                      className="w-100"
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {selectedItem && (
          <Modal show={true} onHide={() => setSelectedItem(null)}>
            <Modal.Header closeButton>
              <Modal.Title>Choose Option for {selectedItem.itemName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Would you like your {selectedItem.itemName} with oil or butter?</p>
              <div className="button-group">
                <Button onClick={() => handleAddToCart('oil')} variant="success">
                  With Oil
                </Button>
                <Button onClick={() => handleAddToCart('butter')} variant="success">
                  With Butter
                </Button>
                <Button onClick={() => setSelectedItem(null)} variant="secondary">
                  Cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default HomePageCard;
