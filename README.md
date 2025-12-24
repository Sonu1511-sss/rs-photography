# RS Photography - MERN Stack Wedding Photography Website

A fully responsive, modern, premium wedding photography website built with MERN Stack (MongoDB, Express, React, Node.js) for RS Photography based in Balaghat, Madhya Pradesh, India.

## 🚀 Features

- **Fully Responsive Design** - Works seamlessly on all devices
- **Modern UI/UX** - Elegant Indian wedding color palette (black, gold, white)
- **Smooth Animations** - Powered by Framer Motion
- **Admin Dashboard** - Complete content management system
- **SEO Optimized** - Search engine friendly
- **Fast Loading** - Optimized images and lazy loading

## 📁 Project Structure

```
photography/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Node.js Backend
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── middleware/        # Auth middleware
    ├── server.js          # Express server
    └── package.json
```

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://shubhamuprade0_db_user:Shubham%40123@cluster0.3hbv4oo.mongodb.net/rs-photography?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (for local development):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3001`

## 🔐 Admin Setup

1. First, register an admin account by making a POST request to `/api/admin/register`:
```json
{
  "username": "admin",
  "email": "admin@rsphotography.com",
  "password": "your_secure_password"
}
```

2. Then login at `/admin/login` with your credentials.

## 📄 Pages

- **Home** - Hero slider, featured galleries, services preview, testimonials
- **About** - Photographer introduction, experience, vision
- **Portfolio** - Separate galleries for Weddings, Pre-Wedding, Engagement
- **Videos** - Wedding films and pre-wedding films
- **Services** - Detailed service offerings
- **Packages** - Silver, Gold, Platinum packages
- **Blog** - SEO-friendly blog posts
- **Testimonials** - Client reviews with ratings
- **FAQ** - Frequently asked questions
- **Contact** - Contact form with Google Maps
- **Privacy Policy** - Privacy policy page

## 🎨 Design Features

- Sticky navbar with transparent → solid on scroll
- WhatsApp floating button
- Instagram & YouTube social links
- Smooth page transitions
- Lightbox image viewer
- Responsive grid layouts
- Elegant typography (Playfair Display + Inter)

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/featured` - Get featured portfolio
- `GET /api/videos` - Get all videos
- `GET /api/blogs` - Get published blogs
- `GET /api/testimonials` - Get all testimonials
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Requires JWT)
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Get dashboard stats
- `POST /api/portfolio` - Create portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item
- Similar CRUD endpoints for videos, blogs, testimonials, contacts

## 🚀 Deployment

### Production URLs

- **Frontend (Vercel)**: https://rs-photography.vercel.app/
- **Backend (Render)**: https://rs-photography-7.onrender.com/

### Backend Deployment (Render)

1. **Set Environment Variables in Render Dashboard:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://shubhamuprade0_db_user:Shubham%40123@cluster0.3hbv4oo.mongodb.net/rs-photography?retryWrites=true&w=majority
CORS_ORIGIN=https://rs-photography.vercel.app
JWT_SECRET=your_strong_secret_key_here
```

2. **Render Settings:**
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. Backend will be available at: `https://rs-photography-7.onrender.com/api`

### Frontend Deployment (Vercel)

1. **Set Environment Variable in Vercel Dashboard:**
```env
VITE_API_URL=https://rs-photography-7.onrender.com/api
```

2. **Build the production bundle:**
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

## 📝 Notes

- Replace placeholder images with actual wedding photos
- Update contact information (phone, email, address)
- Update social media links (Instagram, YouTube)
- Update WhatsApp number in `WhatsAppButton.jsx`
- Customize Google Maps embed in `Contact.jsx`
- Set up proper image upload handling (currently using URLs)

## 🤝 Contributing

This is a private project for RS Photography. For any modifications or customizations, please contact the development team.

## 📄 License

All rights reserved © RS Photography

---

**Built with ❤️ for RS Photography, Balaghat**


















