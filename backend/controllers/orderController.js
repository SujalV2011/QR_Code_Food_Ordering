const mongoose = require('mongoose');
const Order = require('../models/order');
const MenuItem = require('../models/menuitem'); // Assuming you have a menuItem model for menu items

// Function to place an order
const placeOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    if (!tableNumber || !items || items.length === 0) {
      return res.status(400).json({ error: 'Table number and items are required.' });
    }

    // Dynamically set the collection name using the table number
    const OrderModel = mongoose.model(`table_${tableNumber}`, Order.schema);

    // Check if an order already exists for this table
    let existingOrder = await OrderModel.findOne({ tableNumber });

    if (!existingOrder) {
      // If no existing order, create a new one
      const newOrder = new OrderModel({ tableNumber, items });
      await newOrder.save();

      return res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    }

    // Update existing order: Add new items or update quantity of existing items
    items.forEach((newItem) => {
      const existingItem = existingOrder.items.find(
        (item) => item.name === newItem.name && item.option === newItem.option
      );

      if (existingItem) {
        // Update quantity if the item already exists
        existingItem.quantity += newItem.quantity;
      } else {
        // Add new item to the order if it doesn't exist
        existingOrder.items.push(newItem);
      }
    });

    // Save the updated order
    await existingOrder.save();

    return res.status(200).json({ message: 'Order updated successfully', order: existingOrder });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to place or update order', details: error.message });
  }
};

// Function to get the total bill for a specific table number
const getTotalBill = async (req, res) => {
  try {
    const { tableNumber } = req.params;

    // Dynamically set the collection name using the table number
    const OrderModel = mongoose.model(`table_${tableNumber}`, Order.schema);

    // Find the order for the table
    const order = await OrderModel.findOne({ tableNumber });
    if (!order) {
      return res.status(404).json({ error: 'No order found for this table' });
    }

    // Fetch menu item details from the menuitems collection
    let totalAmount = 0;
    for (const item of order.items) {
      const menuItem = await MenuItem.findOne({ name: item.name });
      if (menuItem) {
        // Calculate total price for the item and accumulate the total bill
        const itemTotal = menuItem.price * item.quantity;
        totalAmount += itemTotal;
        item.price = menuItem.price; // Attach the price to the item for the response
        item.totalPrice = itemTotal; // Attach the total price to the item for the response
      }
    }

    return res.status(200).json({
      tableNumber,
      items: order.items,
      totalAmount,
      message: 'Total bill fetched successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch total bill', details: error.message });
  }
};

// Function to approve an order
const approveOrder = async (req, res) => {
  try {
    const { tableNumber } = req.params;

    // Dynamically set the collection name using the table number
    const OrderModel = mongoose.model(`table_${tableNumber}`, Order.schema);

    // Find and update the order's approval status
    const order = await OrderModel.findOneAndUpdate(
      { tableNumber },
      { approve: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: `Order for table ${tableNumber} not found` });
    }

    return res.status(200).json({ message: 'Order approved successfully', order });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to approve order', details: error.message });
  }
};

// Function to fetch all orders across all tables
const getAllTableOrders = async (req, res) => {
  try {
    // Fetch all collection names matching the `table_` pattern
    const collections = await mongoose.connection.db.listCollections().toArray();
    const tableCollections = collections
      .map((col) => col.name)
      .filter((name) => name.startsWith('table_'));

    const allOrders = [];

    // Iterate through each table collection to dynamically fetch orders
    for (const tableCollection of tableCollections) {
      const OrderModel = mongoose.model(tableCollection, Order.schema);

      // Find the order for this table
      const order = await OrderModel.findOne();
      if (order) {
        allOrders.push({
          tableNumber: order.tableNumber,
          items: order.items,
          approve: order.approve,
          createdAt: order.createdAt,
        });
      }
    }

    if (allOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for any table' });
    }

    return res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
};

module.exports = { placeOrder, getTotalBill, approveOrder, getAllTableOrders };
