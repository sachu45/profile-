# API Testing Guide

Complete guide for testing all portfolio API endpoints.

## 🚀 Getting Started

1. Make sure server is running: `npm start`
2. Server URL: `http://localhost:5000`

## ✅ Quick Verification

### Using PowerShell

```powershell
# Test if server is running
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing
Write-Host $response.Content
```

Expected response:
```json
{
    "success": true,
    "message": "Server is running",
    "timestamp": "2026-06-15T..."
}
```

## 📊 Project Endpoints

### 1. Get All Projects
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/projects" -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Response:**
```json
{
    "success": true,
    "count": 5,
    "data": [
        {
            "_id": "...",
            "title": "Movie Booking Website",
            "description": "...",
            "technologies": ["HTML5", "CSS3", "JavaScript"],
            "featured": true,
            "order": 1
        }
    ]
}
```

### 2. Get Featured Projects Only
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/projects/featured" -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 3. Get Single Project
```powershell
# Replace {id} with actual project ID
Invoke-WebRequest -Uri "http://localhost:5000/api/projects/{id}" -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 4. Create New Project (Admin)
```powershell
$body = @{
    title = "My New Project"
    description = "This is an amazing project I built"
    technologies = @("React", "Node.js", "MongoDB")
    featured = $true
    liveUrl = "https://example.com"
    githubUrl = "https://github.com/username/project"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/projects" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 5. Update Project (Admin)
```powershell
# Replace {id} with project ID
$body = @{
    title = "Updated Project Title"
    featured = $false
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/projects/{id}" `
    -Method Put `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 6. Delete Project (Admin)
```powershell
# Replace {id} with project ID
Invoke-WebRequest -Uri "http://localhost:5000/api/projects/{id}" `
    -Method Delete `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

## 💌 Contact Endpoints

### 1. Submit Contact Form
```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    message = "I'm interested in collaborating on your next project!"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/contact" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -UseBasicParsing

Write-Host $response.Content
```

**Success Response:**
```json
{
    "success": true,
    "message": "Message sent successfully! We'll get back to you soon.",
    "data": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "message": "...",
        "status": "unread",
        "createdAt": "2026-06-15T..."
    }
}
```

**Error Response (Spam Check):**
```json
{
    "success": false,
    "message": "Please wait before sending another message"
}
```

### 2. Get All Contact Messages (Admin)
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/contact" `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

### 3. Get Single Contact Message (Admin)
```powershell
# Replace {id} with message ID
Invoke-WebRequest -Uri "http://localhost:5000/api/contact/{id}" `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

## 🔄 Batch Testing Script

Create a file `test-api.ps1`:

```powershell
# Test Portfolio API

$base = "http://localhost:5000/api"

Write-Host "======================================" -ForegroundColor Green
Write-Host "Portfolio API Testing" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# 1. Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
$health = Invoke-WebRequest -Uri "$base/health" -UseBasicParsing
Write-Host "✓ Server Status:" $health.StatusCode -ForegroundColor Green
Write-Host ""

# 2. Get Projects
Write-Host "2. Getting All Projects..." -ForegroundColor Yellow
$projects = Invoke-WebRequest -Uri "$base/projects" -UseBasicParsing | ConvertFrom-Json
Write-Host "✓ Found $($projects.count) projects" -ForegroundColor Green
Write-Host ""

# 3. Create Contact
Write-Host "3. Submitting Contact Form..." -ForegroundColor Yellow
$contactBody = @{
    name = "Test User"
    email = "test@example.com"
    message = "This is a test message for API verification"
} | ConvertTo-Json

$contact = Invoke-WebRequest -Uri "$base/contact" `
    -Method Post `
    -Headers @{"Content-Type"="application/json"} `
    -Body $contactBody `
    -UseBasicParsing | ConvertFrom-Json

if ($contact.success) {
    Write-Host "✓ Contact Form Submitted Successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Contact Form Failed: $($contact.message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "======================================" -ForegroundColor Green
Write-Host "Testing Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
```

Run with:
```powershell
.\test-api.ps1
```

## 🧪 Using Postman (Advanced)

### Import Collection

1. Open Postman
2. Click "Import"
3. Select "Paste Raw Text"
4. Paste this JSON:

```json
{
    "info": {
        "name": "Portfolio API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Health Check",
            "request": {
                "method": "GET",
                "url": "http://localhost:5000/api/health"
            }
        },
        {
            "name": "Get All Projects",
            "request": {
                "method": "GET",
                "url": "http://localhost:5000/api/projects"
            }
        },
        {
            "name": "Submit Contact",
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": "{\"name\":\"John\",\"email\":\"john@example.com\",\"message\":\"Hello\"}"
                },
                "url": "http://localhost:5000/api/contact"
            }
        }
    ]
}
```

## 📋 Validation Rules

### Contact Form
- **name**: Required, max 100 characters
- **email**: Required, valid email format
- **message**: Required, 10-5000 characters
- **Spam Check**: Can't submit twice within 1 hour

### Project
- **title**: Required, max 100 characters
- **description**: Required, max 2000 characters
- **technologies**: Required, array of strings
- **featured**: Optional, boolean
- **order**: Optional, number

## 🔍 Debugging Tips

### Enable Detailed Logging
Add to your test script:
```powershell
$DebugPreference = "Continue"
```

### Check Response Headers
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/projects"
$response.Headers | Format-Table
```

### View Full Error Details
```powershell
Try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/projects" -ErrorAction Stop
} Catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response)" -ForegroundColor Red
}
```

## 🚦 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success - GET requests |
| 201 | Success - Created new resource |
| 400 | Bad Request - Invalid data |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Spam check |
| 500 | Server Error |

## 📝 Common Issues

**Issue: "MongoDB Connected" not showing**
- Solution: Add MONGO_URI to .env file

**Issue: 429 Too Many Requests on Contact**
- Solution: This is spam protection. Wait 1 hour or use different email

**Issue: CORS Error in Frontend**
- Solution: Check CORS is enabled in server.js

**Issue: 404 on API route**
- Solution: Make sure server is running and route path is correct

## ✅ Testing Checklist

- [ ] Server starts without errors
- [ ] Health check returns 200
- [ ] Projects endpoint returns data
- [ ] Featured projects filters work
- [ ] Contact form submission works
- [ ] Contact form spam check works
- [ ] Frontend loads correctly
- [ ] Projects display on frontend
- [ ] Contact form sends message
- [ ] Error messages are helpful

---

**All endpoints tested? You're ready to deploy! 🚀**
