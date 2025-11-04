// Load environment variables from .env file (for local development)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Serve static files from current directory
app.use(express.static('.'));
app.use(express.static(path.join(__dirname)));

// Spotify configuration - using environment variables for security
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'd8124d10496049eea796b314eef19908';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'b8c4036a539d4bffaeef17545fe9e76c';

// Dynamically determine redirect URI based on environment
function getRedirectUri(req) {
    if (process.env.SPOTIFY_REDIRECT_URI) {
        return process.env.SPOTIFY_REDIRECT_URI;
    }

    // If no environment variable, construct from request
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3001';
    return `${protocol}://${host}/callback`;
}

// Route to exchange authorization code for access token
app.post('/exchange-token', async (req, res) => {
    const { code } = req.body;
    const redirectUri = getRedirectUri(req);

    console.log('=== Token Exchange Request ===');
    console.log('Received code:', code ? code.substring(0, 20) + '...' : 'NO CODE');
    console.log('Client ID:', CLIENT_ID);
    console.log('Client Secret set:', CLIENT_SECRET !== 'b8c4036a539d4bffaeef17545fe9e76c');
    console.log('Environment CLIENT_SECRET exists:', !!process.env.SPOTIFY_CLIENT_SECRET);
    console.log('Using CLIENT_SECRET:', CLIENT_SECRET ? CLIENT_SECRET.substring(0, 10) + '...' : 'NONE');
    console.log('Redirect URI:', redirectUri);

    if (!code) {
        console.log('❌ No authorization code provided');
        return res.status(400).json({ error: 'Authorization code is required' });
    }

    if (CLIENT_SECRET === 'YOUR_CLIENT_SECRET_HERE') {
        console.log('❌ Client secret not configured');
        return res.status(500).json({ error: 'Server configuration error: Client secret not set' });
    }

    try {
        // Exchange code for token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            })
        });

        const tokenData = await tokenResponse.json();

        console.log('Spotify API Response Status:', tokenResponse.status);
        console.log('Spotify API Response:', tokenData);

        if (tokenResponse.ok) {
            console.log('✅ Token exchange successful');
            console.log('Access token received:', tokenData.access_token ? tokenData.access_token.substring(0, 20) + '...' : 'NO TOKEN');

            res.json({
                access_token: tokenData.access_token,
                expires_in: tokenData.expires_in,
                refresh_token: tokenData.refresh_token
            });
        } else {
            console.log('❌ Token exchange failed:', tokenData.error_description || tokenData.error);
            res.status(400).json({
                error: tokenData.error || 'Token exchange failed',
                error_description: tokenData.error_description
            });
        }

    } catch (error) {
        console.error('Error exchanging token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Callback route for Spotify redirect
app.get('/callback', (req, res) => {
    const { code, error } = req.query;

    if (error) {
        return res.send(`
            <html>
                <body style="font-family: Arial; padding: 20px; background: #191414; color: white;">
                    <h2>❌ Authorization Error</h2>
                    <p>Error: ${error}</p>
                    <a href="/" style="color: #1db954;">Return to website</a>
                </body>
            </html>
        `);
    }

    if (code) {
        // Send the code to the frontend for token exchange
        res.send(`
            <html>
                <body style="font-family: Arial; padding: 20px; background: #191414; color: white;">
                    <h2>🔄 Processing Authorization...</h2>
                    <p>Exchanging code for access token...</p>
                    <script>
                        // Send code to parent window if opened in popup
                        if (window.opener) {
                            window.opener.postMessage({
                                type: 'spotify_code',
                                code: '${code}'
                            }, '*');
                            window.close();
                        } else {
                            // Exchange token on same page
                            fetch('/exchange-token', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ code: '${code}' })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.access_token) {
                                    localStorage.setItem('spotify_access_token', data.access_token);
                                    localStorage.setItem('spotify_token_expiry', Date.now() + (data.expires_in * 1000));
                                    window.location.href = '/#token_received';
                                } else {
                                    document.body.innerHTML = '<h2>❌ Token exchange failed</h2><p>' + (data.error || 'Unknown error') + '</p>';
                                }
                            })
                            .catch(error => {
                                document.body.innerHTML = '<h2>❌ Network error</h2><p>' + error.message + '</p>';
                            });
                        }
                    </script>
                </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
                <body style="font-family: Arial; padding: 20px; background: #191414; color: white;">
                    <h2>⚠️ No authorization code received</h2>
                    <a href="/" style="color: #1db954;">Return to website</a>
                </body>
            </html>
        `);
    }
});

// Serve CSS files with correct MIME type
app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

// Serve JS files with correct MIME type
app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
    console.log('📁 Serving files from:', __dirname);
    console.log('🎵 Spotify auth endpoint: /callback');
});