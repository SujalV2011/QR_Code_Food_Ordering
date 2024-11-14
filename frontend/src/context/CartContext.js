import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // To hold items in the cart
  const [tableOrders, setTableOrders] = useState([]); // To hold orders for the chef panel

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to increase item quantity in the cart
  const increaseQuantity = (itemId, option) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.option === option
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function to decrease item quantity in the cart
  const decreaseQuantity = (itemId, option) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.option === option
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId, option) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === itemId && item.option === option)));
  };

  // Function to place an order
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
      const response = await axios.post('http://localhost:5000/api/orders', order);

      // If order is placed successfully, store the order in tableOrders
      if (response.status === 200) {
        setTableOrders((prevOrders) => [...prevOrders, response.data.order]);
        alert(`Order placed successfully for table ${tableNumber}`);
        setCart([]); // Clear the cart after placing the order
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        placeOrder,
        tableOrders, // Expose tableOrders for the Chef Panel
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
