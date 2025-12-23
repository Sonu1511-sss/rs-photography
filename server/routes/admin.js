const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Portfolio = require('../models/Portfolio');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const Contact = require('../models/Contact');
const Admin = require('../models/Admin');
const config = require('../config/config');

// Utility: generate JWT for admin
const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: 'admin',
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
};

// Simple health route
router.get('/health', (req, res) => {
  res.json({ message: 'Admin API is running' });
});

// Admin registration (used by AdminSignup.jsx)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email or username already exists' });
    }

    const admin = new Admin({
      username,
      email: email.toLowerCase(),
      password,
    });

    await admin.save();

    const token = generateToken(admin);

    res.status(201).json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Admin register error:', error);
    res.status(500).json({ message: 'Server error while registering admin' });
  }
});

// Default fallback admin credentials (for simple panel access)
const DEFAULT_ADMIN_EMAIL = 'rsphotography0@gmail.com';
const DEFAULT_ADMIN_PASSWORD = 'Rsphoto@321';

// Admin login (used by AdminLogin.jsx)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Simple: accept any non-empty email/password and return a default admin
    const adminPayload = {
      _id: 'default-admin',
      username: 'RSAdmin',
      email: email.toLowerCase(),
    };

    const token = generateToken(adminPayload);

    return res.json({
      token,
      admin: {
        id: adminPayload._id,
        username: adminPayload.username,
        email: adminPayload.email,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error while logging in' });
  }
});

// Dashboard stats used by AdminDashboard.jsx
router.get('/dashboard', async (req, res) => {
  try {
    const [contacts, portfolio, videos, blogs, testimonials] = await Promise.all([
      Contact.countDocuments(),
      Portfolio.countDocuments(),
      Promise.resolve(0), // placeholder until Video model is fully implemented
      Blog.countDocuments(),
      Testimonial.countDocuments(),
    ]);

    const newContacts = await Contact.countDocuments({ status: 'new' });

    res.json({
      stats: {
        contacts,
        newContacts,
        portfolio,
        videos,
        blogs,
        testimonials,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


