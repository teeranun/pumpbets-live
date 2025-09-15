# 🚀 PumpBet Live - Deployment Guide

## Overview
This guide explains how to deploy your PumpBet Live website with real-time market cap data.

## Architecture
- **Frontend**: Static HTML/CSS/JS (hosted on any static hosting)
- **Backend**: Node.js API server (fetches real pump.fun data)
- **Data Flow**: Frontend → Backend API → pump.fun → Real Market Caps

## 🛠️ Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Backend Server
```bash
npm start
# Server runs on http://localhost:3001
```

### 3. Open Frontend
Open `index.html` in your browser. It will automatically use the local API.

## 🌐 Production Deployment

### Option 1: Vercel (Recommended - Easiest)

#### Frontend Deployment:
1. Push your code to GitHub
2. Connect to Vercel
3. Deploy frontend automatically

#### Backend Deployment:
1. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

2. Deploy backend to Vercel
3. Update `getApiBaseUrl()` in `script.js` with your Vercel URL

### Option 2: Netlify + Railway

#### Frontend (Netlify):
1. Connect GitHub repo to Netlify
2. Build command: (none needed - static site)
3. Publish directory: (root)

#### Backend (Railway):
1. Connect GitHub repo to Railway
2. Railway auto-detects Node.js
3. Deploy automatically
4. Update API URL in frontend

### Option 3: DigitalOcean App Platform

#### Both Frontend & Backend:
1. Create new app on DigitalOcean
2. Add frontend as static site
3. Add backend as web service
4. Connect to GitHub repo
5. Deploy both simultaneously

## 🔧 Configuration

### Update API URL for Production
In `script.js`, update the `getApiBaseUrl()` function:

```javascript
getApiBaseUrl() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3001';
    } else {
        // Replace with your actual production backend URL
        return 'https://your-backend-domain.vercel.app'; // or Railway, etc.
    }
}
```

### Environment Variables (if needed)
Create `.env` file for sensitive data:
```
PUMP_FUN_API_KEY=your_api_key_here
RATE_LIMIT=100
```

## 📊 Real Data Integration

### Current Status:
- ✅ Backend server ready
- ✅ Frontend API integration ready
- ⚠️ Need to implement actual pump.fun scraping

### Next Steps for Real Data:
1. **Research pump.fun API endpoints**
2. **Implement proper data scraping**
3. **Add authentication if required**
4. **Handle rate limiting**
5. **Add error handling**

### Example Real API Implementation:
```javascript
// In server.js - replace mock data with real scraping
async function scrapePumpFunData() {
    const response = await axios.get('https://pump.fun/api/live-streams');
    // Parse real data and return formatted streams
    return parseStreamData(response.data);
}
```

## 🚀 Quick Start Commands

### Development:
```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
# Just open index.html in browser
```

### Production:
```bash
# Deploy backend first
vercel --prod

# Deploy frontend
vercel --prod

# Update API URL in frontend
```

## 🔍 Monitoring

### Health Check:
- Backend: `https://your-backend.com/health`
- Frontend: Check browser console for API status

### Logs:
- Vercel: Dashboard → Functions → Logs
- Railway: Dashboard → Deployments → Logs
- DigitalOcean: App Platform → Logs

## 🛡️ Security Considerations

1. **Rate Limiting**: Implement to avoid being blocked
2. **CORS**: Already configured for your domain
3. **Error Handling**: Graceful fallbacks to mock data
4. **API Keys**: Store securely in environment variables

## 📈 Performance Optimization

1. **Caching**: Cache API responses for 30 seconds
2. **CDN**: Use Vercel/Netlify CDN for frontend
3. **Compression**: Enable gzip compression
4. **Monitoring**: Add performance monitoring

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Check backend CORS configuration
2. **API Timeout**: Increase timeout in frontend
3. **Rate Limiting**: Implement proper delays
4. **Data Parsing**: Check pump.fun data structure changes

### Debug Mode:
Add `?debug=true` to URL to see console logs:
```javascript
const debug = new URLSearchParams(window.location.search).get('debug') === 'true';
if (debug) console.log('API Response:', data);
```

## 📞 Support

If you need help with deployment:
1. Check the console for error messages
2. Verify API endpoints are accessible
3. Test with mock data first
4. Check hosting platform logs

---

**Ready to deploy?** Start with Vercel for the easiest setup! 🚀
