import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const increaseQuantity = (itemId, option) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.option === option
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId, option) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.option === option
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const removeFromCart = (itemId, option) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === itemId && item.option === option)));
  };

  const placeOrder = async (tableNumber) => {
    if (!tableNumber) {
      alert('Please provide the table number.');
      return;
    }

    // Prepare the order with table number and items
    const order = {
      tableNumber,
      items: cart,
    };

    try {
      // Send the order to the backend API
      await axios.post('http://localhost:5000/api/orders', order);
      alert(`Order placed successfully for table ${tableNumber}`);
      setCart([]); // Clear the cart after placing the order
    } catch (error) {
      console.error('Error placing the order:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
