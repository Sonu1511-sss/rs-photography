# Environment Variables Setup

## 📝 .env File Configuration

Backend mein `.env` file ko properly configure karein.

### Step 1: .env File Create Karein

Server folder mein `.env` file create karein (agar nahi hai to).

### Step 2: Required Variables

`.env` file mein ye variables add karein:

```env
# Server Port
PORT=5000

# Environment
NODE_ENV=development

# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/rs-photography

# JWT Secret (Production mein strong random string use karein)
JWT_SECRET=your_secret_key_here
```

### Step 3: MongoDB Connection String

#### Option 1: Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/rs-photography
```

#### Option 2: MongoDB Atlas (Cloud)
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rs-photography?retryWrites=true&w=majority
```

**MongoDB Atlas Setup:**
1. MongoDB Atlas account create karein: https://www.mongodb.com/cloud/atlas
2. Cluster create karein
3. Database User create karein
4. Network Access mein IP whitelist karein (0.0.0.0/0 for all)
5. Connection string copy karein aur `.env` mein paste karein

### Step 4: JWT Secret

Production mein strong random string use karein. Generate karne ke liye:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Server Start Karein

```bash
cd server
npm install
npm run dev
```

### ⚠️ Important Notes

1. **Never commit .env file** - Ye file `.gitignore` mein hai
2. **.env.example** file ko reference ke liye rakhein
3. Production mein strong JWT_SECRET use karein
4. MongoDB connection string mein password properly escape karein

### Troubleshooting

**MongoDB Connection Error:**
- Check karein ki MongoDB running hai (local) ya Atlas connection string sahi hai
- Network access properly configured hai
- Username/password sahi hai

**Port Already in Use:**
- `.env` mein PORT change karein
- Ya running process ko stop karein

### Example .env File

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rs-photography
JWT_SECRET=my_super_secret_jwt_key_12345
```








