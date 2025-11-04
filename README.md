# My Vibes - A Digital Reflection of Me

A personal website that reflects personality through hobbies, music, and interactive design — blending creativity, technology, and individuality in one immersive space.

## 🎯 Project Overview

**Goal:** Build a responsive personal website that highlights:
- 🎨 My hobbies and passions
- 🎵 My top 5 music playlist with interactive player
- ✅ A contact form with comprehensive data validation

**Purpose:** To create a personal yet professional digital space that demonstrates both creativity and technical skill — while giving visitors a glimpse of my personality and interests.

## ✨ Features

### 🏠 Hero Section
- Animated title with typing effect
- Floating elements with parallax scrolling
- Rain effect animation for lo-fi atmosphere
- Responsive design with smooth animations

### 🎨 Hobbies & About Me
Interactive showcase of 5 core hobbies:
1. **🎧 Music Listening & Creating** - "I love rainy days and lo-fi music 🌧️"
2. **🤖 Exploring AI & Machine Learning** - "Curiosity meets innovation"
3. **🎮 Gaming** - "Every game is a new way to learn and adapt"
4. **⚙️ Learning New Tools & Technologies** - "Continuous learning keeps me innovative"
5. **🎱 Playing Billiards** - "One good shot at a time"

### 🎵 Interactive Music Playlist
- **Top 5 Songs:**
  1. "Peaches" - Justin Bieber ft. Daniel Caesar, Giveon
  2. "Blinding Lights" - The Weeknd
  3. "Shape of You" - Ed Sheeran
  4. "Good 4 U" - Olivia Rodrigo
  5. "Stay" - The Kid LAROI, Justin Bieber

- **Features:**
  - **Full Spotify Web Playback SDK Integration**
  - Real-time music streaming with Spotify Premium
  - Draggable progress and volume controls
  - Play/pause with proper state management
  - OAuth 2.0 authentication with Spotify
  - Cross-device playback control
  - Professional music player UI

### 📝 Contact Form with Validation
- **Real-time validation with JavaScript:**
  - Name (required, minimum 2 characters)
  - Email (required, must include "@" symbol, valid email format)
  - Message (required, minimum 10 characters with live counter)
  - Subject (optional)

- **UX Features:**
  - Visual feedback for validation states
  - Character counter for message field
  - Success modal with animation
  - Form shake animation on error
  - Loading state during submission

## 🎨 Design Theme

**Lo-fi Rainy Day Aesthetic:**
- **Color Palette:**
  - Primary: Muted purple-blue (#6B73A8)
  - Secondary: Light lavender (#9BA4D9)
  - Accent: Soft pink (#E8B4B8)
  - Dark: Deep navy (#2A2D3A)
  - Background: Darker navy (#1E1F2E)

- **Typography:** Inter font family with varied weights
- **Effects:** Subtle rain animation, soft shadows, smooth transitions
- **Layout:** Clean, minimalist with expressive icons

## 🛠️ Tech Stack

- **HTML5** - Semantic structure with accessibility features
- **CSS3** - Advanced animations, Grid/Flexbox, CSS Variables
- **JavaScript (ES6+)** - Interactive functionality and validation
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family

## 📱 Responsive Design

- **Desktop** - Full experience with all animations
- **Tablet** - Optimized layout with touch-friendly controls
- **Mobile** - Collapsed navigation, stacked layouts, optimized forms

## ⚡ Performance Features

- **Optimized Animations:** Reduced motion support for accessibility
- **Throttled Scroll Handlers:** 60fps performance
- **Lazy Loading:** Ready for future image content
- **Efficient CSS:** CSS Variables and optimized selectors
- **Error Handling:** Global error catching and user feedback

## 🌟 Accessibility Features

- **Keyboard Navigation:** Full tab support and focus management
- **Screen Reader Support:** ARIA labels and live regions
- **High Contrast:** Support for high contrast mode
- **Reduced Motion:** Respects user motion preferences
- **Focus Indicators:** Clear focus states for all interactive elements

## 🚀 Getting Started

### Basic Setup
1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Enjoy the experience!** Navigate through sections and interact with features

### Spotify Integration Setup (Optional)
To enable full Spotify music playback:
1. **Read the setup guide:** See `SPOTIFY_SETUP.md` for detailed instructions
2. **Create Spotify Developer App** at https://developer.spotify.com/dashboard
3. **Update Client ID** in `script.js` line 282
4. **Requires Spotify Premium** account for Web Playback SDK

**Without Spotify setup:** The website works perfectly, but music buttons will show connection prompts.

## 📁 File Structure

```
personal-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS with lo-fi theme
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🎯 Key Validations Demonstrated

The contact form showcases professional-grade validation:

- **Client-side validation** with real-time feedback
- **Email format checking** with regex patterns
- **Character counting** and minimum length requirements
- **Visual feedback** with color-coded states
- **Error prevention** with user-friendly messaging
- **Success confirmation** with modal display

## 💫 Interactive Elements

1. **Navigation:** Smooth scrolling with mobile-responsive hamburger menu
2. **Hero Section:** Parallax scrolling with floating animated elements
3. **Hobby Cards:** 3D hover effects with mouse tracking
4. **Music Player:** Modal-based YouTube integration
5. **Form Validation:** Real-time feedback with visual states
6. **Animations:** Intersection Observer-based scroll animations

## 🎵 Music Integration

Each track in the playlist can be played via YouTube embedding:
- Click any play button to open the modal player
- "Play All" button starts with the first track
- Responsive player with keyboard controls (ESC to close)
- Track information displayed in player header

## 🌧️ Lo-fi Vibes

The design captures the essence of rainy day lo-fi aesthetics:
- Subtle rain animation overlay
- Muted color palette inspired by cloudy skies
- Soft shadows and gentle transitions
- Cozy, introspective atmosphere

---

**"My Vibes isn't just a website — it's a reflection of who I am: creative, curious, and constantly learning. It connects music, technology, and self-expression into one seamless experience."**

---

*Crafted with creativity and code* ✨