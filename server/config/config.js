/**
 * Application Configuration
 * Centralized configuration management
 */

module.exports = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  mongoURI: process.env.MONGODB_URI || 'mongodb+srv://shubhamuprade0_db_user:Rp2ZcPBsbuNuUh1U@cluster0.3hbv4oo.mongodb.net/rs-photography?retryWrites=true&w=majority',
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key_change_in_production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  
  // File Upload Configuration
  maxFileSize: process.env.MAX_FILE_SIZE || 5242880, // 5MB
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  
  // Email Configuration (if needed in future)
  emailHost: process.env.EMAIL_HOST || '',
  emailPort: process.env.EMAIL_PORT || 587,
  emailUser: process.env.EMAIL_USER || '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
};


















