/**
 * Script to create an admin user
 * Run: node scripts/createAdmin.js
 */

require('dotenv').config()
const mongoose = require('mongoose')
const Admin = require('../models/Admin')

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rs-photography')
    console.log('Connected to MongoDB')

    // Get admin details from command line arguments or use defaults
    const username = process.argv[2] || 'admin'
    const email = process.argv[3] || 'admin@rsphotography.com'
    const password = process.argv[4] || 'admin123'

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] })
    if (existingAdmin) {
      console.log('Admin already exists!')
      process.exit(0)
    }

    // Create admin
    const admin = new Admin({ username, email, password })
    await admin.save()
    
    console.log('Admin created successfully!')
    console.log('Username:', username)
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('\nPlease change the password after first login!')
    
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()








