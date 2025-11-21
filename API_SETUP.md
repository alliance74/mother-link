# API Connection Setup Guide

## How Frontend Connects to Backend

Your frontend connects to the backend through the **baseURL** configured in `services/api.js`. Here's how it works:

1. **Base URL**: Set in `services/api.js` (e.g., `http://192.168.1.100:8080`)
2. **Endpoint Path**: Defined in each API call (e.g., `/mobile/health-worker/login`)
3. **Full URL**: Axios combines them → `http://192.168.1.100:8080/mobile/health-worker/login`

## Setup Instructions

### For Development (Testing on Device/Emulator)

**Important**: `localhost` won't work on mobile devices! You need your computer's IP address.

#### Step 1: Find Your Computer's IP Address

**Windows:**
```powershell
ipconfig
```
Look for "IPv4 Address" (e.g., `192.168.1.100`)

**Mac/Linux:**
```bash
ifconfig
# or
ip addr
```

#### Step 2: Create Environment File

Create a `.env` file in your project root:

```env
EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:8080
```

Example:
```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:8080
```

#### Step 3: Make Sure Your Backend is Running

- Start your backend server on port 8080
- Ensure your backend accepts connections from your network (not just localhost)
- Check firewall settings if connection fails

#### Step 4: Restart Expo

After creating/updating `.env`, restart your Expo development server:

```bash
npm start
# or
expo start
```

### For Production

Update your `.env` file with your production API URL:

```env
EXPO_PUBLIC_API_URL=https://api.yourdomain.com
```

## Quick Test

After setup, check the console when your app starts. You should see:
```
API Base URL: http://192.168.1.100:8080
```

## Troubleshooting

### Connection Refused / Network Error
- ✅ Verify backend is running
- ✅ Check IP address is correct
- ✅ Ensure device/emulator is on same network
- ✅ Verify backend accepts external connections (not just localhost)
- ✅ Check firewall isn't blocking port 8080

### CORS Errors (if testing on web)
- Add CORS headers to your backend
- Allow your frontend origin in backend CORS settings

### Still Not Working?
1. Test backend directly: Open `http://YOUR_IP:8080/mobile/health-worker/login` in browser
2. Check backend logs for incoming requests
3. Verify the API endpoint path matches your backend routes

