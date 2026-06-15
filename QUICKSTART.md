# Quick Start Guide - Personal Portfolio

This guide will help you get your portfolio running immediately.

## ⚡ 5-Minute Setup

### 1. Install Dependencies (Already Done ✓)
```bash
npm install
```

### 2. Configure MongoDB

#### Option A: Use MongoDB Atlas (Cloud - Easiest)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (choose M0 free tier)
4. Create database user
5. Get connection string
6. Update `.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
```

#### Option B: Use Local MongoDB
1. Download and install [MongoDB Community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Update `.env`:
```env
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
```

### 3. Start Server
```bash
npm start
```

Server will start on `http://localhost:5000`

### 4. (Optional) Seed Sample Data
Open new terminal and run:
```bash
npm run seed
```

This adds 5 sample projects to database.

## 🧪 Testing the Application

### Frontend
Open browser: `http://localhost:5000`

You should see:
- Hero section with your name
- About, Skills, Projects, and Contact sections
- Beautiful responsive design

### Test Contact Form
1. Scroll to Contact section
2. Fill in the form
3. Click "Send Message"
4. You should see success message

### Test API Endpoints (Using PowerShell)

```powershell
# Test Health Check
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing

# Get All Projects
Invoke-WebRequest -Uri "http://localhost:5000/api/projects" -UseBasicParsing

# Submit Contact Message
$body = @{
    name = "Test User"
    email = "test@example.com"
    message = "This is a test message from the API"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/contact" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing
```

## 🚀 Deployment Options

### Deploy to Heroku (Free with limitations)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set MongoDB URI
heroku config:set MONGO_URI=your_mongodb_atlas_uri

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### Deploy to Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm install`
6. Publish directory: `public`
7. Add environment variables in Netlify dashboard
8. Deploy

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts and add environment variables.

## 📁 Project Files Structure

```
personal-portfolio/
├── config/db.js              # MongoDB connection
├── controllers/              # Request handlers
├── models/                   # Data schemas
├── routes/                   # API endpoints
├── public/                   # Frontend files
│   ├── index.html
│   ├── style.css
│   └── script.js
├── scripts/seedProjects.js   # Sample data
├── server.js                 # Express server
├── .env                      # Config (create this)
├── package.json
└── README.md
```

## 🔧 Customization

### Edit Your Info
File: `public/index.html`
- Line 16-22: Change name and title
- Line 31-36: Update about section
- Lines 53-61: Update social links

### Change Colors
File: `public/style.css`
- Lines 6-13: CSS color variables
- Change primary color from `#d4a373` to your color

### Add Projects
Option 1: Edit `scripts/seedProjects.js` and run `npm run seed`
Option 2: Use API to POST to `/api/projects`

## 🐛 Troubleshooting

### Server Won't Start
- Check if port 5000 is in use
- Kill process: `Get-Process node | Stop-Process`
- Restart server: `npm start`

### Projects Not Loading
- Check MongoDB connection
- Is `.env` file created with MONGO_URI?
- Run `npm run seed` to add sample data
- Check browser console for errors

### Contact Form Not Working
- Is server running?
- Check browser console for errors
- Verify MongoDB is connected
- Try submitting different data

### "Cannot find module" error
- Run: `npm install`
- Delete `node_modules` folder
- Run: `npm install` again

## 📚 File Locations

| File | Purpose |
|------|---------|
| [server.js](server.js) | Main Express server |
| [.env](.env) | Configuration (create/update) |
| [package.json](package.json) | Dependencies |
| [public/index.html](public/index.html) | Frontend HTML |
| [public/script.js](public/script.js) | Frontend JavaScript |
| [public/style.css](public/style.css) | Frontend CSS |
| [models/Contact.js](models/Contact.js) | Contact schema |
| [models/Project.js](models/Project.js) | Project schema |
| [MONGODB_SETUP.md](MONGODB_SETUP.md) | MongoDB guide |
| [README.md](README.md) | Full documentation |

## ✅ What's Working

✅ Frontend responsive design
✅ Backend Express API
✅ MongoDB database integration
✅ Contact form with validation
✅ Projects management
✅ Static file serving
✅ CORS enabled
✅ Error handling
✅ Environment configuration

## 🎯 Next Steps

1. **Local Testing**: Start server and test all features
2. **Customize**: Add your info and projects
3. **Setup MongoDB**: Use Atlas or local
4. **Deploy**: Choose Heroku, Netlify, or Vercel
5. **Monitor**: Check logs and user feedback

## 📞 Need Help?

1. Check [README.md](README.md) for detailed docs
2. Check [MONGODB_SETUP.md](MONGODB_SETUP.md) for database help
3. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
4. Check browser console (F12) for frontend errors
5. Check server logs for backend errors

---

**Happy coding! 🚀**
