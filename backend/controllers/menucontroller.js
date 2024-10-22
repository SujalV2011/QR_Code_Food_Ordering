const MenuItem = require('../models/menuitem');

// Create a new menu item
const createMenuItem = async (req, res) => {
  const { itemName, description, category, itemPrice } = req.body;
  const itemImage = req.file.filename; // Get the file path from Multer

  const newMenuItem = new MenuItem({
    itemName,
    description,
    category,
    itemPrice,
    itemImage,
  });

  try {
    await newMenuItem.save();
    res.status(201).json({ message: 'Menu item created successfully', item: newMenuItem });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
};

module.exports = { createMenuItem };
