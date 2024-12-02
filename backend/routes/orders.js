const express = require('express');
const router = express.Router();
const { placeOrder, getTotalBill, getAllTableOrders, approveOrder } = require('../controllers/orderController');

// Specific route first to avoid conflicts
router.get('/all', getAllTableOrders); // Fetch all orders
router.post('/', placeOrder);          // Place new order
router.get('/:tableNumber', getTotalBill);  // Get bill for a specific table
router.put('/:tablenumber/approve', approveOrder); // Approve order by ID

module.exports = router;
