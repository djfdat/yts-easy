# Screenshots Guide

This directory contains screenshots for the YTS Easy movie browser application. Follow these instructions to capture the required screenshots for the main README.

## Required Screenshots

### 1. Desktop View (`desktop-view.png`)
- **Purpose**: Show the complete app interface with movie list and movie details on desktop
- **Setup**:
  - Open the app at http://localhost:5173
  - Search for a popular movie (e.g., "Avengers" or "Inception")
  - Click on a movie to show details in the right pane
  - Use a wide browser window (1400px+ width)
- **Capture**: Full browser window showing both left (movie list) and right (movie details) panes
- **File name**: `desktop-view.png`

### 2. Mobile View (`mobile-view.png`)
- **Purpose**: Demonstrate the responsive mobile layout
- **Setup**:
  - Open browser developer tools (F12)
  - Set to mobile view (e.g., iPhone 12 or similar)
  - Navigate through the app to show how it adapts to mobile
- **Capture**: Mobile-sized view of the app
- **File name**: `mobile-view.png`

### 3. Movie Details (`movie-details.png`)
- **Purpose**: Show detailed movie information and download options
- **Setup**:
  - Select a movie with good details (poster, description, multiple quality options)
  - Ensure download buttons and quality options are visible
  - Focus on a movie with trailer and good metadata
- **Capture**: Focus on the right pane showing movie details, or full view on mobile
- **File name**: `movie-details.png`

## Screenshot Tips

1. **Browser Setup**:
   - Use a modern browser (Chrome, Firefox, Safari)
   - Set window size to at least 1400x900 for good visibility
   - Use browser developer tools (F12) to set responsive design mode if needed

2. **Theme**:
   - The app uses the "forest" dark theme automatically
   - No additional setup needed - it should look green and dark

3. **Image Quality**:
   - Use high DPI/retina display if available
   - Save as PNG format for best quality
   - Ensure text is readable and UI elements are clear

4. **Content**:
   - Use movies with good poster images
   - Ensure there's actual data (not just loading states)
   - Try popular movies that are likely to have multiple quality options

## Updating README

After capturing screenshots, the main README.md should already have the correct image links:

```markdown
![Desktop View](./screenshots/desktop-view.png)
![Mobile View](./screenshots/mobile-view.png)
![Movie Details](./screenshots/movie-details.png)
```

Simply place your screenshot files in this directory with the correct names.

## Browser Screenshot Commands

### macOS
- **Full window**: Cmd + Shift + 4, then Space, then click the browser window
- **Selected area**: Cmd + Shift + 4, then drag to select the area

### Windows
- **Full window**: Alt + PrtScn
- **Selected area**: Windows + Shift + S

### Linux
- **Full window**: Use `gnome-screenshot` or similar
- **Selected area**: Use `gnome-screenshot -a` or screenshot tool