const express = require('express');
const router = express.Router();
const { placeOrder, getTotalBill } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:tableNumber', getTotalBill);

module.exports = router;
