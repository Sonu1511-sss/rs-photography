const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'RS Photography API is running' });
});

const config = require('./config/config');

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  const dbInfo = config.mongoURI.includes('@') 
    ? config.mongoURI.split('@')[1]?.split('/')[1] || 'rs-photography'
    : config.mongoURI.split('/').pop() || 'rs-photography';
  console.log(`💾 Database: ${dbInfo}`);
  if (!config.jwtSecret || config.jwtSecret.includes('change_this') || config.jwtSecret.includes('default_secret')) {
    console.log('⚠️  Warning: Please change JWT_SECRET in .env file for production!');
  }
});

