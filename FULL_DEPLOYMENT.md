# Complete Deployment Guide

Deploy your personal portfolio to production on Heroku, Netlify, or Vercel.

## Prerequisites

- GitHub account (for version control)
- MongoDB Atlas account (for cloud database)
- Hosting account (Heroku, Netlify, or Vercel)

## Step 1: Prepare for Deployment

### 1. Update .env for Production
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/yourusername/personal-portfolio.git
git push -u origin main
```

### 3. Update Frontend API URL
Edit `public/script.js`:
```javascript
// Change this line from:
const API_BASE_URL = "http://localhost:5000/api";

// To your production domain:
const API_BASE_URL = "https://your-domain.com/api";
```

---

## Option 1: Deploy to Heroku

Heroku is great for quick deployments with a free tier (with limitations).

### 1. Install Heroku CLI
```bash
npm install -g heroku
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
heroku create your-portfolio-app
```

### 4. Set Environment Variables
```bash
heroku config:set MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
heroku config:set NODE_ENV=production
```

### 5. Deploy
```bash
git push heroku main
```

### 6. View Logs
```bash
heroku logs --tail
```

### 7. Open Application
```bash
heroku open
```

Your app is live at: `https://your-portfolio-app.herokuapp.com`

---

## Option 2: Deploy to Netlify

Netlify is excellent for hosting the frontend with easy deployment.

### Method A: Connect GitHub

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site"
3. Select "Import an existing project"
4. Authorize GitHub
5. Select your repository
6. Configure:
   - **Build command**: `npm install`
   - **Publish directory**: `public/`
7. Click "Deploy site"

### Method B: Using Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy
```

### Environment Variables
1. Go to Site settings > Build & deploy > Environment
2. Add:
   - `MONGO_URI`: Your MongoDB Atlas connection
   - `NODE_ENV`: production

### Domain
1. Go to Site settings > Domain management
2. Add your custom domain or use Netlify domain

Your app: `https://your-app.netlify.app`

---

## Option 3: Deploy to Vercel

Vercel is optimized for Node.js applications.

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy
```bash
vercel
```

Follow the prompts:
- Project name: `personal-portfolio`
- Framework: `Other`
- Root directory: `./`

### 3. Set Environment Variables
```bash
vercel env add MONGO_URI
vercel env add NODE_ENV
```

### 4. Deploy Again
```bash
vercel
```

Your app: `https://your-portfolio.vercel.app`

---

## Option 4: Deploy Using Docker

For production use with Docker:

### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### 2. Create docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - NODE_ENV=production
    depends_on:
      - mongodb
  
  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### 3. Run
```bash
docker-compose up
```

---

## Database Configuration for Production

### MongoDB Atlas Setup

1. **Create Free Cluster**
   - Go to [MongoDB Atlas](https://mongodb.com/cloud/atlas)
   - Create account
   - Create free M0 cluster

2. **Create Database User**
   - Go to "Database Access"
   - Add user with "Atlas Admin" role
   - Save username and password

3. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

4. **Whitelist IPs**
   - Go to "Network Access"
   - Add IP addresses or "Allow access from anywhere"

### Format
```
mongodb+srv://username:password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Domain Configuration

### Using Custom Domain

1. **Buy Domain**
   - Namecheap, GoDaddy, or Google Domains

2. **Update DNS Records**
   - Point to your hosting (varies by platform)
   
3. **Enable HTTPS**
   - Most platforms auto-enable
   - Setup certificate if needed

### DNS Examples

**For Heroku:**
```
CNAME: your-domain.com → your-app.herokuapp.com
```

**For Netlify:**
```
CNAME: your-domain.com → your-app.netlify.app
```

---

## Post-Deployment Checklist

- [ ] Site loads in browser
- [ ] API endpoints working (check `/api/health`)
- [ ] Projects display
- [ ] Contact form works
- [ ] Images load (if using image URLs)
- [ ] Links work correctly
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Performance acceptable
- [ ] No console errors

---

## Monitoring & Maintenance

### View Logs
**Heroku:**
```bash
heroku logs --tail
```

**Netlify:**
- Site settings > Deploys

**Vercel:**
```bash
vercel logs
```

### Update Code
After making changes:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Auto-deployment happens when you push to main branch.

### Update Environment Variables
1. Go to your platform's dashboard
2. Update `.env` variables
3. Redeploy if needed

---

## Troubleshooting

### Site Shows 404
- Check build logs
- Verify routes are correct
- Check static files are served

### API Not Responding
- Verify MongoDB is connected
- Check environment variables
- Check logs for errors

### Slow Performance
- Optimize images
- Enable caching
- Check MongoDB queries
- Use CDN for static assets

### CORS Errors
- Check CORS settings in server.js
- Update frontend API URL
- Check API base URL in script.js

---

## Security Best Practices

1. **Never commit .env**
   - Add to .gitignore (already done)
   - Use platform's environment variables

2. **Use HTTPS**
   - All platforms provide free SSL

3. **Validate Input**
   - Backend validates all inputs (already done)

4. **Secure MongoDB**
   - Use strong passwords
   - Whitelist IPs
   - Use MongoDB Atlas IP whitelist

5. **Add Authentication**
   - For admin endpoints
   - Use JWT or sessions

---

## Performance Optimization

### Frontend
- Minify CSS/JS in production
- Optimize images
- Cache static assets

### Backend
- Add indexes to MongoDB
- Implement caching
- Rate limiting

### Database
- Use MongoDB Atlas for scalability
- Monitor usage
- Backup regularly

---

## Cost Estimates

| Platform | Free Tier | Cost |
|----------|-----------|------|
| Heroku | Limited | $7-50/month |
| Netlify | Full | Free (Pro $19+) |
| Vercel | Full | Free (Pro $20+) |
| MongoDB Atlas | 512MB | Free (Paid plans available) |

---

## Next Steps

1. ✅ Code is ready
2. ✅ Database configured
3. ⏭️ **Deploy to your chosen platform**
4. ⏭️ Test all functionality
5. ⏭️ Monitor and iterate
6. ⏭️ Add custom domain
7. ⏭️ Setup backups

---

**Ready to go live? Pick a platform and deploy! 🚀**
