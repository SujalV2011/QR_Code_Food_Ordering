const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuitem');
const { createMenuItem } = require('../controllers/menucontroller');
const upload = require('../config/multerconfig');
const path = require('path');

// Serve static files from the uploads directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Fetch all menu items or filter by category
router.get('/menuitems', async (req, res) => {
  try {
    const { category } = req.query; // Get the category from query parameters
    const filter = category ? { category: category.toLowerCase() } : {}; // Build filter object

    const menuItems = await MenuItem.find(filter); // Fetch filtered or all items

    // Map through menu items to add the full URL for images
    const menuItemsWithImages = menuItems.map(item => ({
      ...item._doc,
      itemImage: `${req.protocol}://${req.get('host')}/${item.itemImage}`  
    }));

    res.status(200).json(menuItemsWithImages);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Fetch a specific menu item by name (without image)
router.get('/menuitems/:name', async (req, res) => {
  try {
    const { name } = req.params; // Get the name from the URL parameter
    const menuItem = await MenuItem.findOne({ itemName: name }); // Find the item by name

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Return only the itemName and itemPrice
    const itemResponse = {
      itemName: menuItem.itemName,
      itemPrice: menuItem.itemPrice
    };

    res.status(200).json(itemResponse);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// Create a new menu item
router.post('/menu', upload.single('itemImage'), createMenuItem); 

module.exports = router;
