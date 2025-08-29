# PWA Setup Guide

## Icon Generation

The app is now configured as a Progressive Web App (PWA) with a custom Q logo. To complete the setup, you need to generate PNG icons from the SVG file.

### Required Icon Sizes:
- `favicon.ico` (16x16, 32x32, 48x48 pixels)
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels) 
- `apple-touch-icon.png` (180x180 pixels)

### How to Generate Icons:

#### Option 1: Online Tools
1. Go to an online SVG to PNG converter (like convertio.co, cloudconvert.com)
2. Upload the `public/icon.svg` file
3. Convert to PNG at the required sizes
4. Save the files in the `public/` directory

#### Option 2: Image Editing Software
1. Open `public/icon.svg` in Photoshop, GIMP, or similar
2. Export as PNG at the required sizes
3. Save in the `public/` directory

#### Option 3: Command Line (if you have ImageMagick)
```bash
cd public
convert icon.svg -resize 16x16 favicon-16.png
convert icon.svg -resize 32x32 favicon-32.png
convert icon.svg -resize 48x48 favicon-48.png
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png
convert icon.svg -resize 180x180 apple-touch-icon.png

# Combine PNGs into ICO file (requires additional tools)
```

### PWA Features Included:
- ✅ Manifest file with app configuration
- ✅ Service worker for offline functionality
- ✅ PWA meta tags in layout
- ✅ Custom Q logo with white-to-grey gradient
- ✅ Black background theme
- ✅ Standalone app mode
- ✅ Offline caching

### Testing PWA:
1. Build and deploy the app
2. Open in Chrome/Edge on desktop
3. Look for the "Install" button in the address bar
4. On mobile, you'll see "Add to Home Screen" option

### Current Status:
- ✅ PWA configuration complete
- ⏳ PNG icons need to be generated (replace placeholder files)
- ✅ Service worker registered
- ✅ Manifest configured
- ✅ Meta tags added

Once you generate the PNG icons, your app will be a fully functional PWA that can be installed on devices!
