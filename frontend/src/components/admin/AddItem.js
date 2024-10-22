import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const categories = [
    { value: 'south-indian', label: 'South Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'pizza', label: 'Pizza' },
  ];

  const handleImageChange = (e) => {
    setItemImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('itemPrice', itemPrice);
    formData.append('itemImage', itemImage);

    try {
      const response = await axios.post('http://localhost:5000/api/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Item Added Successfully!'); // Alert message for success
        // Reset form fields
        setItemName('');
        setDescription('');
        setCategory('');
        setItemPrice('');
        setItemImage(null);
        // Refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.'); // Alert message for error
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '5rem',
    },
    heading: {
      textAlign: 'center',
      color: '#1F618D',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
    },
    label: {
      color: '#1F618D',
      fontWeight: 'bold',
    },
    input: {
      border: '1px solid #1F618D',
    },
    button: {
      backgroundColor: '#1F618D',
      color: '#fff',
      border: 'none',
      padding: '0.75rem',
      fontSize: '1rem',
      borderRadius: '5px',
      width: '100%',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div>
      <AdminNavbar title="La'RIVERA INN" />
      <Container style={styles.container}>
        <h2 style={styles.heading}>Add New Item</h2>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
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

          <Form.Group controlId="description" className="mb-3">
            <Form.Label style={styles.label}>Description</Form.Label>
            <Form.Control
              style={styles.input}
              as="textarea"
              rows={3}
              placeholder="Enter item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="category" className="mb-3">
            <Form.Label style={styles.label}>Category</Form.Label>
            <Form.Select style={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="itemImage" className="mb-3">
            <Form.Label style={styles.label}>Item Image (Upload)</Form.Label>
            <Form.Control
              style={styles.input}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="itemPrice" className="mb-3">
            <Form.Label style={styles.label}>Item Price</Form.Label>
            <Form.Control
              style={styles.input}
              type="number"
              placeholder="Enter item price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Button style={styles.button} type="submit">
            Add Item
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddItem;
