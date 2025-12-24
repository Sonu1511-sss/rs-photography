# Setup Guide - RS Photography Website

## Quick Start

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

**For Local Development:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://shubhamuprade0_db_user:Shubham%40123@cluster0.3hbv4oo.mongodb.net/rs-photography?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

**For Production (Render):**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://shubhamuprade0_db_user:Shubham%40123@cluster0.3hbv4oo.mongodb.net/rs-photography?retryWrites=true&w=majority
CORS_ORIGIN=https://rs-photography.vercel.app
JWT_SECRET=your_strong_secret_key_here
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

**Local Development:**
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@rsphotography.com",
    "password": "your_secure_password"
  }'
```

**Production:**
```bash
curl -X POST https://rs-photography-7.onrender.com/api/admin/register \
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
```

Create a `.env` file in the `client` directory:

**For Local Development:**
```env
VITE_API_URL=http://localhost:5000/api
```

**For Production (Vercel):**
```env
VITE_API_URL=https://rs-photography-7.onrender.com/api
```

Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3001`

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

### Production URLs

- **Frontend**: https://rs-photography.vercel.app/
- **Backend**: https://rs-photography-7.onrender.com/

### Backend Deployment (Render)

1. **Set Environment Variables in Render Dashboard:**
   - `NODE_ENV=production`
   - `MONGODB_URI=mongodb+srv://shubhamuprade0_db_user:Shubham%40123@cluster0.3hbv4oo.mongodb.net/rs-photography?retryWrites=true&w=majority`
   - `CORS_ORIGIN=https://rs-photography.vercel.app`
   - `JWT_SECRET=your_strong_secret_key_here`

2. **Render Settings:**
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. Backend API will be available at: `https://rs-photography-7.onrender.com/api`

### Frontend Deployment (Vercel)

1. **Set Environment Variable in Vercel Dashboard:**
   - `VITE_API_URL=https://rs-photography-7.onrender.com/api`

2. **Build the project:**
```bash
cd client
npm run build
```

3. Deploy to Vercel (automatic with GitHub integration)

4. Frontend will be available at: `https://rs-photography.vercel.app/`

### Important Notes

- ✅ All API routes use `/api` base path
- ✅ CORS is configured to allow only production frontend
- ✅ No localhost references in production code
- ✅ Environment variables are properly configured

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


















