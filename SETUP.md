# Setup Guide - RS Photography Website

## Quick Start

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rs-photography
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

Start MongoDB (if running locally):
```bash
mongod
```

Start the server:
```bash
npm run dev
```

### 2. Create Admin Account

Option 1: Using the script
```bash
node scripts/createAdmin.js username email password
```

Option 2: Using API (after server is running)
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@rsphotography.com",
    "password": "your_secure_password"
  }'
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The website will be available at `http://localhost:3000`

## Configuration

### Update Contact Information

1. **Phone Number**: Update in `client/src/components/WhatsAppButton.jsx` and `client/src/components/Footer.jsx`
2. **Email**: Update in `client/src/components/Footer.jsx` and `client/src/pages/Contact.jsx`
3. **Address**: Update in `client/src/pages/Contact.jsx` and Google Maps embed

### Update Social Media Links

1. **Instagram**: Update in `client/src/components/Navbar.jsx` and `client/src/components/Footer.jsx`
2. **YouTube**: Update in `client/src/components/Navbar.jsx` and `client/src/components/Footer.jsx`

### Update Images

Replace placeholder images with actual wedding photos:
- Hero slider images in `client/src/pages/Home.jsx`
- Portfolio images (upload via admin dashboard)
- About page image in `client/src/pages/About.jsx`

## Admin Dashboard

1. Navigate to `/admin/login`
2. Login with your admin credentials
3. Access the dashboard at `/admin/dashboard`

### Features:
- View statistics
- Manage portfolio items
- Manage videos
- Manage blog posts
- Manage testimonials
- View contact enquiries

## Production Deployment

### Backend (Heroku/Railway example)

1. Set environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `NODE_ENV=production`

2. Deploy the server folder

### Frontend (Vercel/Netlify example)

1. Build the project:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder

3. Update API URL in `vite.config.js` for production:
```js
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-url.com',
      changeOrigin: true
    }
  }
}
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- For MongoDB Atlas, whitelist your IP address

### CORS Issues
- Ensure backend CORS is configured correctly
- Check that frontend proxy is set up in `vite.config.js`

### Admin Login Issues
- Ensure admin account is created
- Check JWT_SECRET is set
- Verify token is stored in localStorage

## Support

For issues or questions, please contact the development team.














