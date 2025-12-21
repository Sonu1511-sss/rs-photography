const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const portfolio = await Portfolio.find(query).sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured portfolio items
router.get('/featured', async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ featured: true }).limit(6).sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single portfolio item
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create portfolio item (Admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('Portfolio create request:', {
      body: req.body,
      file: req.file ? req.file.filename : 'no file'
    });

    const portfolioData = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description || '',
      featured: req.body.featured === 'true' || req.body.featured === true
    };
    
    // If image is uploaded, use the uploaded file URL
    if (req.file) {
      portfolioData.imageUrl = `/uploads/${req.file.filename}`;
    }
    // If imageUrl is provided in body (for URL input), use it
    else if (req.body.imageUrl && req.body.imageUrl.trim()) {
      portfolioData.imageUrl = req.body.imageUrl.trim();
    } else {
      return res.status(400).json({ message: 'Image is required. Please upload an image or provide an image URL.' });
    }
    
    console.log('Creating portfolio with data:', portfolioData);
    
    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();
    console.log('Portfolio created successfully:', portfolio._id);
    res.status(201).json(portfolio);
  } catch (error) {
    console.error('Portfolio create error:', error);
    res.status(400).json({ message: error.message || 'Failed to create portfolio item' });
  }
});

// Update portfolio item (Admin only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    // Get existing portfolio first
    const existingPortfolio = await Portfolio.findById(req.params.id);
    if (!existingPortfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    const portfolioData = { ...req.body };
    
    // If new image is uploaded, use the uploaded file URL
    if (req.file) {
      portfolioData.imageUrl = `/uploads/${req.file.filename}`;
    }
    // If imageUrl is provided in body (for URL input), use it
    else if (req.body.imageUrl) {
      portfolioData.imageUrl = req.body.imageUrl;
    }
    // If no new image and no imageUrl provided, keep existing imageUrl
    else {
      portfolioData.imageUrl = existingPortfolio.imageUrl;
    }
    
    // Convert featured string to boolean if needed
    if (typeof portfolioData.featured === 'string') {
      portfolioData.featured = portfolioData.featured === 'true';
    }
    
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      portfolioData,
      { new: true, runValidators: true }
    );
    res.json(portfolio);
  } catch (error) {
    console.error('Portfolio update error:', error);
    res.status(400).json({ message: error.message || 'Failed to update portfolio item' });
  }
});

// Delete portfolio item (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;





