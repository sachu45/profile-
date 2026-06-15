# MongoDB Setup Guide

This guide will help you set up MongoDB for your portfolio project.

## Option 1: MongoDB Atlas (Cloud - Recommended)

MongoDB Atlas is the easiest option for getting started. It's free and requires no local installation.

### Steps:

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Register"
   - Create a free account

2. **Create a Cluster**
   - In the dashboard, click "Create a Cluster"
   - Choose the free tier (M0)
   - Select your region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `portfoliouser`
   - Password: Create a strong password
   - Select "Atlas Admin" role
   - Click "Add User"

4. **Get Connection String**
   - Go to "Clusters" in left menu
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string (it will look like):
   ```
   mongodb+srv://portfoliouser:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

5. **Update .env File**
   ```env
   MONGO_URI=mongodb+srv://portfoliouser:YOUR_PASSWORD@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```
   Replace `YOUR_PASSWORD` with your actual password.

6. **Whitelist Your IP**
   - In MongoDB Atlas dashboard
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - For production, add specific IPs

## Option 2: Local MongoDB (Windows)

If you prefer to run MongoDB locally on Windows:

### Steps:

1. **Download MongoDB Community Edition**
   - Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select Windows
   - Download the MSI installer

2. **Install MongoDB**
   - Run the installer (.msi file)
   - Choose "Complete" setup
   - Check "Install MongoDB as a Service"
   - Click "Install"

3. **Start MongoDB Service**
   - Press `Win + R`
   - Type `services.msc`
   - Find "MongoDB"
   - Make sure it's set to "Automatic" and status is "Running"

4. **Verify Installation**
   - Open PowerShell or Command Prompt
   - Type: `mongosh`
   - You should see a MongoDB connection prompt

5. **Update .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   NODE_ENV=development
   ```

## Option 3: MongoDB with Docker

If you have Docker installed:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then use:
```env
MONGO_URI=mongodb://localhost:27017/portfolio
```

## Testing the Connection

1. Save your `.env` file
2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:5000/api/health`
4. You should see:
   ```json
   {
       "success": true,
       "message": "Server is running",
       "timestamp": "2026-06-15T..."
   }
   ```

5. If it shows "MongoDB Connected", you're good to go!

## Troubleshooting

### "MongoDB Connected" is not showing
- Check your `.env` file for correct MONGO_URI
- Make sure MongoDB is running (if local)
- Check your IP is whitelisted (if using Atlas)
- Look at server logs for specific error

### Connection timeout
- If using Atlas: Check internet connection and IP whitelist
- If local: Make sure mongod is running and listening on port 27017

### Authentication failed
- Double-check username and password in connection string
- Make sure you're using the correct database user (not admin account)

## Next Steps

1. Once MongoDB is running, seed sample data:
   ```bash
   npm run seed
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:5000` in your browser

4. Check the Projects section - you should see sample projects loaded from database

5. Try submitting the contact form

## For Production (Heroku/Netlify/Vercel)

When deploying, use MongoDB Atlas with your production connection string in the deployment platform's environment variables.

---

**Questions?** Check the main README.md or DEPLOYMENT.md
