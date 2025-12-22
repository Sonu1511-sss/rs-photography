const express = require('express');
const router = express.Router();

const Portfolio = require('../models/Portfolio');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const Contact = require('../models/Contact');

// Simple health route
router.get('/health', (req, res) => {
  res.json({ message: 'Admin API is running' });
});

// Dashboard stats used by AdminDashboard.jsx
router.get('/dashboard', async (req, res) => {
  try {
    const [contacts, portfolio, videos, blogs, testimonials] = await Promise.all([
      Contact.countDocuments(),
      Portfolio.countDocuments(),
      Promise.resolve(0), // placeholder until Video model is fully implemented
      Blog.countDocuments(),
      Testimonial.countDocuments()
    ]);

    const newContacts = await Contact.countDocuments({ status: 'new' });

    res.json({
      stats: {
        contacts,
        newContacts,
        portfolio,
        videos,
        blogs,
        testimonials
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


