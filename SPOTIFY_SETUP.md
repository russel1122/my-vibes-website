# Spotify Integration Setup Guide

## 🎵 Setting Up Spotify Web Playback SDK

Your website is ready for Spotify integration! Follow these steps to connect your Spotify account and enable music playback.

## Step 1: Create a Spotify Developer Application

1. **Go to Spotify Developer Dashboard:**
   - Visit: https://developer.spotify.com/dashboard
   - Log in with your Spotify account (you need Spotify Premium for Web Playback SDK)

2. **Create a New App:**
   - Click "Create an App"
   - Fill in the details:
     - **App Name:** My Vibes Website
     - **App Description:** Personal website music player
     - **Website:** http://localhost (or your domain if hosted)
     - **Redirect URI:** http://localhost (or your domain)
   - Check the terms and conditions box
   - Click "Create"

3. **Get Your Client ID:**
   - In your new app dashboard, copy the **Client ID**
   - Keep the **Client Secret** private (you won't need it for this integration)

## Step 2: Configure Your Website

1. **Update script.js:**
   - Open your `script.js` file
   - Find line 269: `const clientId = 'your_client_id_here';`
   - Replace `'your_client_id_here'` with your actual Client ID from Step 1

2. **Set Redirect URI:**
   - In your Spotify app settings, add your website URL as a redirect URI
   - For local testing: `http://localhost` or `file://`
   - For hosted sites: `https://yourdomain.com`

## Step 3: Test the Integration

1. **Open your website**
2. **Navigate to the Music section**
3. **Click "Login with Spotify"**
4. **Authorize the application** when Spotify redirects you
5. **You should see "Connected to Spotify!" status**
6. **Click any play button** to test music playback

## 🎯 How It Works

- **Authentication:** OAuth 2.0 flow with Spotify
- **Playback:** Uses Spotify Web Playback SDK for in-browser playback
- **Requirements:** Spotify Premium account required
- **Features:** Play, pause, skip, volume control, progress tracking

## 🚨 Important Notes

- **Spotify Premium Required:** Free accounts cannot use Web Playback SDK
- **Browser Compatibility:** Modern browsers with Web Audio API support
- **HTTPS Required:** For production sites, Spotify requires HTTPS
- **Device Transfer:** The player will transfer playback to your browser

## 🎵 Your Playlist Tracks

The website includes these Spotify tracks:
1. "Peaches" - Justin Bieber (`spotify:track:4iJyoBOLtHqaGxP12qzhQI`)
2. "Burn" - Usher (`spotify:track:0UjsXo9l6I8TxARM6a4H0k`)
3. "Get You" - Daniel Caesar ft. Kali Uchis (`spotify:track:6Qs4SXO9dwPAqxNcuh8nHt`)
4. "Snooze" - SZA (`spotify:track:4iZ4pt7kvcaH6Yo8UoZ4s2`)
5. "Residuals" - Chris Brown (`spotify:track:3k3v4rTRxUaFSsQOQGNjFw`)

## 🔧 Troubleshooting

**If authentication fails:**
- Check your Client ID is correct
- Verify redirect URI matches exactly
- Ensure you have Spotify Premium
- Clear browser cache and try again

**If music doesn't play:**
- Check browser console for errors
- Ensure Spotify app isn't blocking the browser player
- Try refreshing the page after authentication

**Connection issues:**
- Check internet connection
- Verify Spotify service status
- Try logging out and back in

## 🌟 Features Available

✅ **Full Spotify Integration**
✅ **OAuth Authentication**
✅ **Real-time Playback Control**
✅ **Progress Tracking**
✅ **Volume Control**
✅ **Skip/Previous Controls**
✅ **Now Playing Display**
✅ **Device Management**

---

*Once configured, your visitors can connect their Spotify accounts and enjoy your curated playlist directly on your website!*