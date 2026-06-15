# Personal Portfolio Website - Deployment Guide

A production-ready full-stack personal portfolio website.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation
```bash
npm install
npm run dev
```

Visit `http://localhost:5000`

## 📁 Project Structure
- `config/` - Database configuration
- `controllers/` - Request handlers
- `models/` - MongoDB schemas
- `routes/` - API endpoints
- `public/` - Frontend (HTML, CSS, JS)
- `scripts/` - Utility scripts
- `server.js` - Express server

## 🔧 Environment Setup

Create `.env`:
```env
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
```

## 📚 API Endpoints

### Projects
- `GET /api/projects` - All projects
- `GET /api/projects/:id` - Single project
- `POST /api/projects` - Create
- `PUT /api/projects/:id` - Update
- `DELETE /api/projects/:id` - Delete

### Contact
- `POST /api/contact` - Submit form
- `GET /api/contact` - All messages

## 🌐 Deployment

### Heroku
```bash
heroku create your-app
heroku config:set MONGO_URI=your_uri
git push heroku main
```

### Netlify / Vercel
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set publish directory: `public/`
4. Add environment variables

## 📝 Customization
- Edit `public/index.html` for personal info
- Edit `public/style.css` for colors/styling
- Use seed script: `npm run seed`

## 🛠 Database Seeding
```bash
npm run seed
```

## 📞 Support
Check README.md for detailed documentation.
