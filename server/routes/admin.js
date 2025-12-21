const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const Portfolio = require('../models/Portfolio');
const Video = require('../models/Video');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const Comment = require('../models/Comment');

// Admin Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      if (existingAdmin.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingAdmin.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const admin = new Admin({ username, email, password });
    await admin.save();
    
    const token = jwt.sign({ adminId: admin._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    res.status(201).json({ 
      token, 
      admin: { 
        id: admin._id, 
        username: admin.username, 
        email: admin.email 
      },
      message: 'Admin account created successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(400).json({ message: error.message || 'Failed to create admin account' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validation - accept either username or email
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    if (!username && !email) {
      return res.status(400).json({ message: 'Username or email is required' });
    }

    // Find admin by username or email
    const admin = await Admin.findOne(
      username ? { username } : { email: email.toLowerCase() }
    );
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    res.json({ 
      token, 
      admin: { 
        id: admin._id, 
        username: admin.username, 
        email: admin.email 
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed. Please try again.' });
  }
});

// Get admin dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const [contacts, portfolio, videos, blogs, testimonials, comments] = await Promise.all([
      Contact.countDocuments(),
      Portfolio.countDocuments(),
      Video.countDocuments(),
      Blog.countDocuments(),
      Testimonial.countDocuments(),
      Comment.countDocuments()
    ]);

    const newContacts = await Contact.countDocuments({ status: 'new' });
    const pendingComments = await Comment.countDocuments({ approved: false });

    res.json({
      stats: {
        contacts,
        portfolio,
        videos,
        blogs,
        testimonials,
        comments,
        newContacts,
        pendingComments
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify token
router.get('/verify', auth, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;

