// ===== GLOBAL VARIABLES =====
let currentTrack = null;
let isPlaying = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFormValidation();
    initializeMusicPlayer();
    initializeAnimations();
    initializeSmoothScrolling();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(30, 31, 46, 0.98)';
        } else {
            navbar.style.background = 'rgba(30, 31, 46, 0.95)';
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = 70;
                let offsetTop;

                // Scroll to show ONLY the clicked section
                if (targetId === '#home') {
                    // Home: Show complete hero section from the very top
                    offsetTop = 0;
                } else {
                    // For other sections: scroll to the exact start of the section
                    // This ensures you see ONLY the clicked section, not the previous one
                    offsetTop = targetSection.offsetTop - navbarHeight;
                }

                console.log(`🎯 Scrolling to ${targetId}:`);
                console.log(`   Section starts at: ${targetSection.offsetTop}px`);
                console.log(`   Scrolling to: ${offsetTop}px`);

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Debug: Check what's visible after scroll
                setTimeout(() => {
                    const actualScroll = window.pageYOffset;
                    const sectionTop = targetSection.offsetTop;
                    console.log(`   ✅ Scrolled to: ${actualScroll}px`);
                    console.log(`   📍 Section visibility: ${actualScroll + navbarHeight >= sectionTop ? 'PERFECT' : 'NEEDS ADJUSTMENT'}`);
                }, 1000);
            }
        });
    });
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('charCounter');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);

    // Character counter for message
    messageInput.addEventListener('input', updateCharCounter);

    // Form submission
    form.addEventListener('submit', handleFormSubmit);

    // Close modal
    closeModal.addEventListener('click', closeSuccessModal);
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    function validateName() {
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();

        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!email.includes('@')) {
            showError(emailInput, emailError, 'Email must include "@" symbol');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }

    function validateMessage() {
        const messageError = document.getElementById('messageError');
        const message = messageInput.value.trim();

        if (message === '') {
            showError(messageInput, messageError, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, messageError, `Message must be at least 10 characters (${message.length}/10)`);
            return false;
        } else {
            showSuccess(messageInput, messageError);
            return true;
        }
    }

    function updateCharCounter() {
        const messageLength = messageInput.value.length;
        charCounter.textContent = `${messageLength}/10 characters`;

        if (messageLength >= 10) {
            charCounter.style.color = 'var(--primary-color)';
        } else {
            charCounter.style.color = 'var(--gray-color)';
        }
    }

    function showError(input, errorElement, message) {
        input.style.borderColor = 'var(--accent-color)';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--accent-color)';
    }

    function showSuccess(input, errorElement) {
        input.style.borderColor = 'var(--primary-color)';
        errorElement.textContent = '';
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Reset form
                form.reset();
                updateCharCounter();

                // Reset button
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;

                // Show success modal
                showSuccessModal();

                // Reset field styles
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.style.borderColor = 'rgba(107, 115, 168, 0.2)';
                });
            }, 2000);
        } else {
            // Shake form on error
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    }

    function showSuccessModal() {
        successModal.style.display = 'block';
        successModal.classList.add('show');

        // Add animation class to modal content
        const modalContent = successModal.querySelector('.modal-content');
        modalContent.style.animation = 'fadeInUp 0.5s ease-out';
    }

    function closeSuccessModal() {
        const modalContent = successModal.querySelector('.modal-content');
        modalContent.style.animation = 'fadeInUp 0.3s ease-out reverse';

        setTimeout(() => {
            successModal.style.display = 'none';
            successModal.classList.remove('show');
        }, 300);
    }
}

// ===== SPOTIFY WEB PLAYBACK SDK INTEGRATION =====
// ========================================
// 🎵 SPOTIFY CONFIGURATION - SETUP REQUIRED
// ========================================
//
// TO ENABLE SPOTIFY INTEGRATION:
// 1. Visit: https://developer.spotify.com/dashboard
// 2. Create a new app with these settings:
//    - App Name: "My Vibes Website"
//    - Redirect URI: Your website URL (e.g., http://localhost or https://yourdomain.com)
// 3. Copy your Client ID and replace 'your_client_id_here' below
// 4. You need Spotify Premium for Web Playback SDK to work
//
// IMPORTANT: Keep your Client Secret private - don't put it in frontend code!
//
const SPOTIFY_CLIENT_ID = 'd8124d10496049eea796b314eef19908'; // 🔧 REPLACE THIS with your Spotify Client ID
// 🔧 REDIRECT URI - Dynamically determined based on environment
const SPOTIFY_REDIRECT_URI = `${window.location.origin}/callback`;

// Global Spotify variables
let spotifyPlayer = null;
let deviceId = null;
let accessToken = null;

// Global callback for Spotify SDK - MUST be in global scope
window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('Spotify SDK ready callback triggered');

    if (!window.Spotify) {
        console.error('Spotify SDK not available');
        updateStatus('Spotify SDK failed to load', 'error');
        return;
    }

    if (!accessToken) {
        console.log('No access token available yet');
        return;
    }

    initializeSpotifyPlayer();
};

function initializeSpotifyPlayer() {
    console.log('Initializing Spotify player with token');

    try {
        spotifyPlayer = new Spotify.Player({
            name: 'My Vibes Player',
            getOAuthToken: cb => {
                console.log('Spotify requesting token');
                cb(accessToken);
            },
            volume: 0.7
        });

        // Error handling
        spotifyPlayer.addListener('initialization_error', ({ message }) => {
            console.error('Failed to initialize:', message);
            updateStatus('Initialization failed', 'error');
        });

        spotifyPlayer.addListener('authentication_error', ({ message }) => {
            console.error('Failed to authenticate:', message);
            updateStatus('Authentication failed', 'error');
        });

        spotifyPlayer.addListener('account_error', ({ message }) => {
            console.error('Failed to validate account:', message);
            updateStatus('Account validation failed', 'error');
        });

        spotifyPlayer.addListener('playback_error', ({ message }) => {
            console.error('Failed to perform playback:', message);
            updateStatus('Playback error', 'error');
        });

        // Playback status updates
        spotifyPlayer.addListener('player_state_changed', (state) => {
            if (!state) return;

            const track = state.track_window.current_track;
            if (track) {
                updatePlayerDisplay(track, state);
            }

            isPlaying = !state.paused;
            updatePlayButtonIcons();
        });

        // Ready
        spotifyPlayer.addListener('ready', ({ device_id }) => {
            console.log('🎵 Spotify Player Ready!');
            console.log('Device ID:', device_id);
            deviceId = device_id;
            updateStatus('Connected to Spotify!', 'connected');

            // Show success notification
            showMusicNotification('Connected!', 'Spotify player ready');

            // Transfer playback to this device
            transferPlayback();
        });

        // Not Ready
        spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
            updateStatus('Device offline', 'error');
        });

        // Connect to the player!
        spotifyPlayer.connect().then(success => {
            if (success) {
                console.log('Successfully connected to Spotify!');
                // Start real-time progress updates
                startProgressUpdater();
            } else {
                console.error('Failed to connect to Spotify');
                updateStatus('Connection failed', 'error');
            }
        });

    } catch (error) {
        console.error('Error creating Spotify player:', error);
        updateStatus('Failed to create player', 'error');
    }
}

// Real-time progress updater
function startProgressUpdater() {
    console.log('🚀 Starting progress updater');
    setInterval(async () => {
        if (spotifyPlayer && isPlaying) {
            try {
                const state = await spotifyPlayer.getCurrentState();
                if (state && state.track_window.current_track) {
                    const progress = (state.position / state.duration) * 100;
                    console.log('📊 Progress update:', Math.round(progress) + '%', 'Position:', state.position, 'Duration:', state.duration);

                    if (progressFill) {
                        progressFill.style.width = progress + '%';
                    } else {
                        console.warn('⚠️ progressFill element not found');
                    }

                    // Update progress handle position
                    const progressHandle = document.getElementById('progressHandle');
                    if (progressHandle) {
                        progressHandle.style.left = progress + '%';
                    }
                    if (currentTime) {
                        currentTime.textContent = formatTime(state.position / 1000);
                    } else {
                        console.warn('⚠️ currentTime element not found');
                    }
                    if (totalTime) {
                        totalTime.textContent = formatTime(state.duration / 1000);
                    } else {
                        console.warn('⚠️ totalTime element not found');
                    }
                }
            } catch (error) {
                console.error('❌ Progress updater error:', error);
            }
        }
    }, 1000); // Update every second
}

// Global function to update player display
function updatePlayerDisplay(track, state) {
    const playerTrackTitle = document.getElementById('playerTrackTitle');
    const playerArtistName = document.getElementById('playerArtistName');
    const currentArtwork = document.getElementById('currentArtwork');
    const progressFill = document.getElementById('progressFill');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');

    if (playerTrackTitle) playerTrackTitle.textContent = track.name;
    if (playerArtistName) playerArtistName.textContent = track.artists.map(artist => artist.name).join(', ');

    if (track.album.images.length > 0 && currentArtwork) {
        currentArtwork.src = track.album.images[0].url;
    }

    // Update progress
    const progress = (state.position / state.duration) * 100;
    if (progressFill) progressFill.style.width = progress + '%';

    // Update progress handle position
    const progressHandle = document.getElementById('progressHandle');
    if (progressHandle) progressHandle.style.left = progress + '%';

    if (currentTime) currentTime.textContent = formatTime(state.position / 1000);
    if (totalTime) totalTime.textContent = formatTime(state.duration / 1000);
}

// Global function to format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initializeMusicPlayer() {
    let currentTrackIndex = 0;
    let tracks = [];

    // Initialize tracks array from HTML with Spotify data
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach((btn, index) => {
        tracks.push({
            title: btn.getAttribute('data-title'),
            artist: btn.getAttribute('data-artist'),
            spotifyUri: btn.getAttribute('data-spotify-uri'),
            artwork: btn.getAttribute('data-artwork'),
            index: parseInt(btn.getAttribute('data-track'))
        });
    });

    // DOM Elements
    const playPauseBtn = document.getElementById('playPauseBtn');
    const mainPlayBtn = document.getElementById('mainPlayBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
    const volumeBar = document.getElementById('volumeBar');
    const volumeFill = document.getElementById('volumeFill');
    const playerTrackTitle = document.getElementById('playerTrackTitle');
    const playerArtistName = document.getElementById('playerArtistName');
    const currentArtwork = document.getElementById('currentArtwork');
    const spotifyLoginBtn = document.getElementById('spotifyLoginBtn');
    const spotifyAuth = document.getElementById('spotifyAuth');
    const spotifyStatus = document.getElementById('spotifyStatus');
    const statusText = document.getElementById('statusText');
    const statusIcon = document.getElementById('statusIcon');
    const logoutBtn = document.getElementById('logoutBtn');
    const authStatus = document.getElementById('authStatus');

    // Debug function to check current Spotify state
    window.checkSpotifyState = function() {
        console.log('=== Spotify State Debug ===');
        console.log('accessToken:', !!accessToken);
        console.log('deviceId:', deviceId);
        console.log('spotifyPlayer:', !!spotifyPlayer);
        console.log('window.Spotify:', !!window.Spotify);
        console.log('Player connected:', spotifyPlayer ? spotifyPlayer._options : 'no player');

        // Check localStorage
        const storedToken = localStorage.getItem('spotify_access_token');
        const storedExpiry = localStorage.getItem('spotify_token_expiry');
        console.log('Stored token exists:', !!storedToken);
        console.log('Stored token valid:', storedToken && storedExpiry && Date.now() < parseInt(storedExpiry));

        return {
            hasToken: !!accessToken,
            hasDeviceId: !!deviceId,
            hasPlayer: !!spotifyPlayer,
            hasSDK: !!window.Spotify,
            hasStoredToken: !!storedToken,
            storedTokenValid: storedToken && storedExpiry && Date.now() < parseInt(storedExpiry)
        };
    };

    // Debug function to manually trigger auth check
    window.debugAuth = function() {
        console.log('=== Debugging Auth Flow ===');
        console.log('Current URL:', window.location.href);
        console.log('URL Search:', window.location.search);
        console.log('URL Hash:', window.location.hash);
        initializeSpotifyAuth();
    };

    // Debug function to manually trigger login
    window.testLogin = function() {
        console.log('=== Testing Login Function ===');
        console.log('loginToSpotify function exists:', typeof loginToSpotify);
        console.log('Button element exists:', !!document.getElementById('spotifyLoginBtn'));
        loginToSpotify();
    };

    // Initialize Spotify Authentication
    function initializeSpotifyAuth() {
        console.log('=== initializeSpotifyAuth called ===');

        // Check for authorization code in URL (from redirect)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const searchError = urlParams.get('error');

        // Also check hash for errors (common with implicit flow failures)
        const hashString = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hashString);
        const hashError = hashParams.get('error');

        console.log('URL Search Params:', window.location.search);
        console.log('URL Hash:', window.location.hash);
        console.log('Authorization code:', code);
        console.log('Search Error:', searchError);
        console.log('Hash Error:', hashError);

        // Handle errors from either location
        const error = searchError || hashError;
        if (error) {
            console.error('Spotify authorization error:', error);

            if (error === 'unsupported_response_type') {
                console.log('Implicit flow not supported, your Spotify app needs to be configured for it.');
                updateStatus('Spotify app configuration issue', 'error');

                // Clear the error from URL
                window.location.hash = '';

                // Show helpful message
                showMusicNotification('Config Issue', 'Your Spotify app needs implicit grant enabled');
            } else {
                updateStatus('Authorization failed: ' + error, 'error');
            }
            return;
        }

        if (code) {
            console.log('Authorization code received, exchanging for token...');
            exchangeCodeForToken(code);
            return;
        }

        // Check for access token in hash (implicit flow)
        const tokenHash = window.location.hash.substring(1);
        console.log('Checking hash for token:', tokenHash);

        if (tokenHash) {
            // Parse hash parameters
            const hashParams = new URLSearchParams(tokenHash);
            const token = hashParams.get('access_token');
            const hashError = hashParams.get('error');

            console.log('Hash params:', Object.fromEntries(hashParams));
            console.log('Access token found:', !!token);
            console.log('Hash error:', hashError);

            if (hashError) {
                console.error('Error in hash:', hashError);
                updateStatus('Authorization error: ' + hashError, 'error');
                return;
            }

            if (token) {
                console.log('✅ Token found in hash!');
                accessToken = token;

                // Store token for future use
                localStorage.setItem('spotify_access_token', token);

                // Store expiry time if available
                const expiresIn = hashParams.get('expires_in');
                if (expiresIn) {
                    const expiryTime = Date.now() + (parseInt(expiresIn) * 1000);
                    localStorage.setItem('spotify_token_expiry', expiryTime.toString());
                    console.log('Token expires in:', expiresIn, 'seconds');
                }

                // Clean URL but don't do it immediately - let's debug first
                console.log('Token extracted from URL hash:', token.substring(0, 20) + '...');

                // Check if SDK is ready, if so initialize player immediately
                if (window.Spotify) {
                    console.log('SDK already loaded, initializing player with token');
                    initializeSpotifyPlayer();
                } else {
                    console.log('Waiting for SDK to load with token...');
                }

                // Clean URL after a short delay to ensure everything is processed
                setTimeout(() => {
                    window.location.hash = '';
                    console.log('URL hash cleared');
                }, 1000);

                return;
            }
        }

        // Check for stored token
        const storedToken = localStorage.getItem('spotify_access_token');
        const expiryTime = localStorage.getItem('spotify_token_expiry');

        if (storedToken && expiryTime && Date.now() < parseInt(expiryTime)) {
            accessToken = storedToken;
            console.log('Using stored valid token');

            // Check if SDK is ready, if so initialize player immediately
            if (window.Spotify) {
                console.log('SDK already loaded, initializing player with stored token');
                initializeSpotifyPlayer();
            } else {
                console.log('Waiting for SDK to load with stored token...');
            }
        } else {
            // Clear expired tokens
            if (storedToken) {
                console.log('Token expired, clearing storage');
                localStorage.removeItem('spotify_access_token');
                localStorage.removeItem('spotify_token_expiry');
            }
            updateStatus('Please connect to Spotify', 'disconnected');
        }
    }

    // Exchange authorization code for access token using backend server
    function exchangeCodeForToken(code) {
        console.log('=== exchangeCodeForToken called ===');
        console.log('Authorization code:', code);
        updateStatus('Exchanging code for token...', 'connecting');

        // Clean URL first
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        // Exchange code for token using backend server
        fetch('/exchange-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                console.log('✅ Token received from backend!');
                console.log('Token:', data.access_token.substring(0, 20) + '...');

                // Store the token
                accessToken = data.access_token;
                localStorage.setItem('spotify_access_token', data.access_token);

                // Store expiry time
                if (data.expires_in) {
                    const expiryTime = Date.now() + (data.expires_in * 1000);
                    localStorage.setItem('spotify_token_expiry', expiryTime.toString());
                    console.log('Token expires in:', data.expires_in, 'seconds');
                }

                // Initialize player with token
                if (window.Spotify) {
                    console.log('SDK loaded, initializing player with backend token');
                    updateStatus('Connecting to Spotify...', 'connecting');
                    initializeSpotifyPlayer();
                } else {
                    console.log('Waiting for SDK to load...');
                }

            } else {
                console.error('❌ Token exchange failed:', data.error);
                updateStatus('Token exchange failed: ' + (data.error || 'Unknown error'), 'error');
                showMusicNotification('Auth Failed', data.error || 'Token exchange failed');
            }
        })
        .catch(error => {
            console.error('❌ Network error during token exchange:', error);
            updateStatus('Network error during token exchange', 'error');
            showMusicNotification('Network Error', 'Could not exchange token');
        });
    }

    // Spotify Login
    function loginToSpotify() {
        console.log('=== loginToSpotify called ===');
        const scope = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';

        // Using backend server for token exchange - more reliable
        const useImplicitGrant = false; // Using authorization code flow with backend

        let authUrl;
        if (useImplicitGrant) {
            // Implicit Grant Flow (requires implicit grant enabled in Spotify app)
            authUrl = `https://accounts.spotify.com/authorize?` +
                `client_id=${SPOTIFY_CLIENT_ID}&` +
                `response_type=token&` +
                `redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&` +
                `scope=${encodeURIComponent(scope)}&` +
                `show_dialog=true`;
            console.log('Using implicit grant flow');
        } else {
            // Authorization Code Flow (more reliable but requires backend)
            authUrl = `https://accounts.spotify.com/authorize?` +
                `client_id=${SPOTIFY_CLIENT_ID}&` +
                `response_type=code&` +
                `redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&` +
                `scope=${encodeURIComponent(scope)}&` +
                `show_dialog=true`;
            console.log('Using authorization code flow');
        }

        console.log('Auth URL:', authUrl);
        console.log('Redirect URI:', SPOTIFY_REDIRECT_URI);
        console.log('Client ID:', SPOTIFY_CLIENT_ID);

        authStatus.textContent = 'Redirecting to Spotify...';
        console.log('Redirecting to Spotify...');
        window.location.href = authUrl;
    }

    // Initialize Spotify Player
    function initializeSpotifyPlayer() {
        if (!accessToken) {
            console.error('No access token available');
            return;
        }

        // Hide auth, show status
        spotifyAuth.style.display = 'none';
        spotifyStatus.style.display = 'block';
        updateStatus('Connecting to Spotify...', 'connecting');

        // Store token
        localStorage.setItem('spotify_access_token', accessToken);

        // Token is ready, now check if SDK is loaded and initialize if needed
        if (window.Spotify && accessToken) {
            console.log('SDK loaded and token available, initializing player');
            initializeSpotifyPlayer();
        } else {
            console.log('Waiting for SDK to load or token to be available...');
        }
    }

    // Transfer playback to this device
    async function transferPlayback() {
        console.log('🔄 Transferring playback to browser device...');
        console.log('Device ID:', deviceId);

        if (!deviceId || !accessToken) {
            console.error('Cannot transfer: missing deviceId or accessToken');
            return false;
        }

        try {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                body: JSON.stringify({
                    device_ids: [deviceId],
                    play: false // Don't auto-play during transfer
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok || response.status === 204) {
                console.log('✅ Playback transferred successfully');
                return true;
            } else {
                const errorText = await response.text();
                console.warn('❌ Transfer failed:', response.status, errorText);
                return false;
            }
        } catch (error) {
            console.error('❌ Transfer error:', error);
            return false;
        }
    }

    // Play track using Spotify API
    async function playSpotifyTrack(trackUri, retryCount = 0) {
        console.log('=== playSpotifyTrack Debug Info ===');
        console.log('trackUri:', trackUri);
        console.log('retryCount:', retryCount);
        console.log('accessToken exists:', !!accessToken);
        console.log('accessToken value:', accessToken ? accessToken.substring(0, 20) + '...' : 'null');
        console.log('deviceId exists:', !!deviceId);
        console.log('deviceId value:', deviceId);
        console.log('spotifyPlayer exists:', !!spotifyPlayer);
        console.log('spotifyPlayer connected:', spotifyPlayer ? 'unknown' : 'no player');

        // Prevent infinite loops
        if (retryCount >= 2) {
            console.log('❌ Maximum retry attempts reached');
            showMusicNotification('Playback Failed', 'Too many retry attempts');
            return;
        }

        if (!accessToken) {
            console.log('❌ Missing accessToken');
            showMusicNotification('Not Connected', 'Please connect your Spotify account first');
            return;
        }

        if (!deviceId) {
            console.log('❌ Missing deviceId - player might not be ready');
            showMusicNotification('Player Not Ready', 'Spotify player is initializing...');

            // Try to reinitialize player if we have token but no device
            if (accessToken && window.Spotify) {
                console.log('Attempting to reinitialize player...');
                initializeSpotifyPlayer();
            }
            return;
        }

        console.log('🎵 Attempting to play track via Spotify API');
        console.log('API URL:', `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`);
        console.log('Track URI:', trackUri);

        // Only transfer if this is not a retry (to avoid unnecessary transfers)
        if (retryCount === 0) {
            console.log('First attempt - trying direct playback without transfer');
        }

        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({
                uris: [trackUri]
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        }).then(async response => {
            console.log('Spotify API Response Status:', response.status);
            console.log('Spotify API Response OK:', response.ok);

            if (response.ok) {
                console.log('✅ Track started successfully');
                showMusicNotification('Now Playing', 'Song started successfully');
            } else {
                const errorText = await response.text();
                console.error('❌ Failed to play track:', response.status, response.statusText);
                console.error('Error details:', errorText);
                showMusicNotification('Playback Error', `Failed: ${response.status}`);

                // Handle different error types
                if (response.status === 404) {
                    console.log('Device not found, attempting to transfer playback...');
                    await transferPlayback();

                    // Retry after a delay
                    setTimeout(() => {
                        console.log('Retrying playback after transfer...');
                        playSpotifyTrack(trackUri, retryCount + 1);
                    }, 2000);
                } else if (response.status === 403) {
                    console.log('Forbidden - device transfer needed...');
                    showMusicNotification('Device Transfer', 'Transferring playback to browser...');

                    // Ensure device is active and transfer playback
                    if (spotifyPlayer) {
                        console.log('Activating device and transferring playback...');

                        // Activate the device first
                        spotifyPlayer.activateElement();

                        // Then transfer playback
                        await transferPlayback();

                        // Wait longer for transfer to complete
                        setTimeout(() => {
                            console.log('Retrying after device activation...');
                            playSpotifyTrack(trackUri, retryCount + 1);
                        }, 5000);
                    } else {
                        showMusicNotification('Player Error', 'Spotify player not ready');
                    }
                }
            }
        }).catch(error => {
            console.error('❌ Network error playing track:', error);
            showMusicNotification('Error', 'Network error occurred');
        });
    }


    // Update status display
    function updateStatus(message, type) {
        statusText.textContent = message;
        statusIcon.className = `fas fa-circle`;

        const indicator = statusIcon.parentElement;
        indicator.className = `status-indicator ${type}`;
    }

    // Event Listeners - with debugging
    if (spotifyLoginBtn) {
        console.log('✅ Spotify login button found, adding event listener');
        spotifyLoginBtn.addEventListener('click', function() {
            console.log('🔘 Spotify login button clicked!');
            loginToSpotify();
        });
    } else {
        console.error('❌ spotifyLoginBtn element not found!');
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    } else {
        console.warn('⚠️ logoutBtn element not found (this might be normal)');
    }

    function logout() {
        localStorage.removeItem('spotify_access_token');
        if (spotifyPlayer) {
            spotifyPlayer.disconnect();
        }
        spotifyAuth.style.display = 'block';
        spotifyStatus.style.display = 'none';
        authStatus.textContent = '';
    }

    // Function to update player display immediately when track is clicked
    function updatePlayerDisplayFromHTML(button) {
        const title = button.getAttribute('data-title');
        const artist = button.getAttribute('data-artist');
        const artwork = button.getAttribute('data-artwork');

        if (title && artist) {
            playerTrackTitle.textContent = title;
            playerArtistName.textContent = artist;

            if (artwork) {
                currentArtwork.src = artwork;
            }

            // Update global playing state
            isPlaying = true;

            // Update play button icon to show it's playing
            const playIcon = button.querySelector('i');
            if (playIcon) {
                playIcon.className = 'fas fa-pause';
            }

            // Reset other play buttons to play icon
            playButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    const otherIcon = otherBtn.querySelector('i');
                    if (otherIcon) {
                        otherIcon.className = 'fas fa-play';
                    }
                }
            });

            // Update main player controls
            updatePlayButtonIcons();

            console.log('✅ Updated player display:', title, 'by', artist, 'isPlaying:', isPlaying);
        }
    }

    // Track play buttons
    playButtons.forEach((btn) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const trackUri = this.getAttribute('data-spotify-uri');

            // Immediately update the player display
            updatePlayerDisplayFromHTML(this);

            if (trackUri && deviceId) {
                playSpotifyTrack(trackUri);
            } else {
                showMusicNotification('Connect Spotify', 'Please connect your Spotify account first');
            }
        });
    });

    // Player controls
    playPauseBtn.addEventListener('click', () => {
        if (spotifyPlayer) {
            spotifyPlayer.togglePlay().then(() => {
                // Manually toggle the state and update icons
                isPlaying = !isPlaying;
                updatePlayButtonIcons();
                console.log('🎵 Manual play/pause toggle. isPlaying:', isPlaying);
            });
        }
    });

    mainPlayBtn.addEventListener('click', () => {
        if (spotifyPlayer) {
            spotifyPlayer.togglePlay().then(() => {
                // Manually toggle the state and update icons
                isPlaying = !isPlaying;
                updatePlayButtonIcons();
                console.log('🎵 Manual main play toggle. isPlaying:', isPlaying);
            });
        }
    });

    prevBtn.addEventListener('click', () => {
        if (spotifyPlayer) {
            spotifyPlayer.previousTrack();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (spotifyPlayer) {
            spotifyPlayer.nextTrack();
        }
    });

    // Volume control
    if (volumeBar) {
        volumeBar.addEventListener('click', function(e) {
            const rect = volumeBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            console.log('🔊 Volume control clicked. Percent:', Math.round(percent * 100) + '%');

            if (spotifyPlayer) {
                spotifyPlayer.setVolume(percent).then(() => {
                    console.log('✅ Volume set to:', Math.round(percent * 100) + '%');
                    if (volumeFill) {
                        volumeFill.style.width = percent * 100 + '%';
                        console.log('✅ Volume fill updated to:', percent * 100 + '%');
                    }

                    // Update volume handle position
                    const volumeHandle = document.getElementById('volumeHandle');
                    if (volumeHandle) volumeHandle.style.left = (percent * 100) + '%';
                }).catch(error => {
                    console.error('❌ Failed to set volume:', error);
                });
            } else {
                console.warn('⚠️ spotifyPlayer not available');
            }
        });
    } else {
        console.warn('⚠️ volumeBar element not found');
    }

    // Add drag functionality to volume control
    let isDraggingVolume = false;
    const volumeHandle = document.getElementById('volumeHandle');

    if (volumeHandle) {
        volumeHandle.addEventListener('mousedown', function(e) {
            isDraggingVolume = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (isDraggingVolume && volumeBar) {
                const rect = volumeBar.getBoundingClientRect();
                let percent = (e.clientX - rect.left) / rect.width;
                percent = Math.max(0, Math.min(1, percent)); // Clamp between 0-1

                volumeHandle.style.left = (percent * 100) + '%';
                if (volumeFill) volumeFill.style.width = (percent * 100) + '%';
            }
        });

        document.addEventListener('mouseup', function(e) {
            if (isDraggingVolume && spotifyPlayer && volumeBar) {
                const rect = volumeBar.getBoundingClientRect();
                let percent = (e.clientX - rect.left) / rect.width;
                percent = Math.max(0, Math.min(1, percent));

                spotifyPlayer.setVolume(percent).then(() => {
                    console.log('🔊 Volume dragged to:', Math.round(percent * 100) + '%');
                }).catch(error => {
                    console.error('❌ Failed to set volume via drag:', error);
                });
            }
            isDraggingVolume = false;
        });
    }

    // Progress bar (seek)
    progressBar.addEventListener('click', function(e) {
        if (!spotifyPlayer) return;

        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;

        spotifyPlayer.getCurrentState().then(state => {
            if (state) {
                const seekPosition = percent * state.duration;
                spotifyPlayer.seek(seekPosition);

                // Update handle position immediately
                const progressHandle = document.getElementById('progressHandle');
                if (progressHandle) progressHandle.style.left = (percent * 100) + '%';
                if (progressFill) progressFill.style.width = (percent * 100) + '%';
            }
        });
    });

    // Add drag functionality to progress bar
    let isDraggingProgress = false;
    const progressHandle = document.getElementById('progressHandle');

    if (progressHandle) {
        progressHandle.addEventListener('mousedown', function(e) {
            isDraggingProgress = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (isDraggingProgress && progressBar) {
                const rect = progressBar.getBoundingClientRect();
                let percent = (e.clientX - rect.left) / rect.width;
                percent = Math.max(0, Math.min(1, percent)); // Clamp between 0-1

                progressHandle.style.left = (percent * 100) + '%';
                if (progressFill) progressFill.style.width = (percent * 100) + '%';
            }
        });

        document.addEventListener('mouseup', function(e) {
            if (isDraggingProgress && spotifyPlayer) {
                const rect = progressBar.getBoundingClientRect();
                let percent = (e.clientX - rect.left) / rect.width;
                percent = Math.max(0, Math.min(1, percent));

                spotifyPlayer.getCurrentState().then(state => {
                    if (state) {
                        const seekPosition = percent * state.duration;
                        spotifyPlayer.seek(seekPosition);
                    }
                });
            }
            isDraggingProgress = false;
        });
    }


    function updatePlayButtonIcons() {
        const playIcon = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        console.log('🔄 Updating play button icons. isPlaying:', isPlaying, 'Icon:', playIcon);

        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i');
            if (icon) {
                icon.className = playIcon;
                console.log('✅ Updated playPauseBtn icon to:', playIcon);
            } else {
                console.warn('⚠️ No icon found in playPauseBtn');
            }
        } else {
            console.warn('⚠️ playPauseBtn element not found');
        }

        if (mainPlayBtn) {
            const icon = mainPlayBtn.querySelector('i');
            if (icon) {
                icon.className = playIcon;
                console.log('✅ Updated mainPlayBtn icon to:', playIcon);
            } else {
                console.warn('⚠️ No icon found in mainPlayBtn');
            }
        } else {
            console.warn('⚠️ mainPlayBtn element not found');
        }
    }

    function showMusicNotification(title, message) {
        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fab fa-spotify"></i>
                </div>
                <div class="notification-text">
                    <div class="notification-title">${title}</div>
                    <div class="notification-track">${message}</div>
                </div>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: rgba(42, 45, 58, 0.95);
            border: 1px solid var(--primary-color);
            border-radius: var(--radius-lg);
            padding: var(--spacing-md);
            color: var(--light-color);
            z-index: 2001;
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow-strong);
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    // Initialize authentication on load
    initializeSpotifyAuth();

    console.log('🎵 Spotify Web Playback SDK Player initialized');
    console.log('🎶 Ready for full Spotify integration!');
}

// ===== ANIMATIONS AND SCROLL EFFECTS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe hobby cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        observer.observe(card);
    });

    // Observe tracks
    const tracks = document.querySelectorAll('.track');
    tracks.forEach(track => {
        observer.observe(track);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Floating elements animation
        const elements = document.querySelectorAll('.element');
        elements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mouse move effect for hobby cards
    const hobbyCardsForMouse = document.querySelectorAll('.hobby-card');
    hobbyCardsForMouse.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Typing effect for hero title
    typeWriter();
}

// ===== TYPING EFFECT =====
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--primary-color)';

    let i = 0;
    const speed = 100;

    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }

    // Start typing after a delay
    setTimeout(type, 1000);
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced scroll listener with throttling
const optimizedScrollHandler = throttle(function() {
    // Handle navbar background
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(30, 31, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(30, 31, 46, 0.95)';
    }

    // Handle parallax effects
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }

    // Floating elements animation
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16); // ~60fps

// Replace the existing scroll listener
window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Focus management for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images (if we add any)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error occurred:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno,
        error: e.error
    });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// ===== CSS ANIMATION CLASSES =====

// Add CSS classes dynamically for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }

    .shake {
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

    .loading-state {
        opacity: 0.6;
        pointer-events: none;
    }

    .success-highlight {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 3px rgba(107, 115, 168, 0.2) !important;
    }

    .error-highlight {
        border-color: var(--accent-color) !important;
        box-shadow: 0 0 0 3px rgba(232, 180, 184, 0.2) !important;
    }
`;

document.head.appendChild(style);

// ===== INITIALIZATION CHECK =====
console.log('🎵 My Vibes - JavaScript loaded successfully!');
console.log('🌧️ Ready for some lo-fi vibes...');