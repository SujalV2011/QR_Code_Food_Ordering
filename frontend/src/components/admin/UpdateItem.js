import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const UpdateItem = () => {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true); // Available by default

  const categories = [
    { value: 'south-indian', label: 'South Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'pizza', label: 'Pizza' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedItem = {
      category,
      itemName,
      newPrice,
      isAvailable
    };

    const availabilityStatus = isAvailable ? 'Available' : 'Not Available';
    alert(`Item Updated Successfully! Status: ${availabilityStatus}`);
  };

  // Inline styles scoped to this component
  const styles = {
    container: {
      maxWidth: '600px',
      backgroundColor: '#F8F9FA',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      marginTop: '5rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#1F618D'
    },
    heading: {
      textAlign: 'center',
      color: '#1F618D',
      marginBottom: '20px',
    },
    label: {
      color: '#1F618D',
    },
    input: {
      border: '1px solid #1F618D',
    },
    button: {
      backgroundColor: '#1F618D',
      borderColor: '#1F618D',
      width: '100%',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      marginTop: '20px',
    },
    checkboxLabel: {
      color: '#1F618D',
    },
  };

  return (
    <div>
      <AdminNavbar title="La'RIVERA INN" />
      <Container style={styles.container}>
        <h2 style={styles.heading}>Update Item</h2>
        <Form onSubmit={handleSubmit}>
          {/* Category */}
          <Form.Group controlId="category" className="mb-3">
            <Form.Label style={styles.label}>Category</Form.Label>
            <Form.Select
              style={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Item Name */}
          <Form.Group controlId="itemName" className="mb-3">
            <Form.Label style={styles.label}>Item Name</Form.Label>
            <Form.Control
              style={styles.input}
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </Form.Group>

          {/* New Price (optional) */}
          <Form.Group controlId="newPrice" className="mb-3">
            <Form.Label style={styles.label}>New Price (optional)</Form.Label>
            <Form.Control
              style={styles.input}
              type="number"
              placeholder="Enter new price (leave blank if no change)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </Form.Group>

          {/* Availability (Toggle) */}
          <Form.Group controlId="isAvailable" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Available today"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              style={styles.checkboxLabel}
            />
          </Form.Group>

          <Button style={styles.button} type="submit">
            Update Item
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateItem;
