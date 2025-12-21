const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);
      
      // Check if admin exists
      const admin = await Admin.findById(decoded.adminId);
      if (!admin) {
        return res.status(401).json({ message: 'Token is not valid' });
      }

      // Add admin to request
      req.admin = admin;
      req.adminId = decoded.adminId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error in authentication' });
  }
};

module.exports = auth;
