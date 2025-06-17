# YTS Easy

A modern, responsive movie browser built with SvelteKit and DaisyUI that connects to the YTS API. Browse, search, and download movies with a beautiful green-themed interface.

## Features

### 🎬 **Movie Browsing**
- Browse the latest movies from YTS
- Infinite scroll for seamless browsing
- Clean, modern two-pane layout

### 🔍 **Advanced Search & Filtering**
- Search movies by title
- Filter by genre (Action, Drama, Comedy, etc.)
- Filter by quality (480p, 720p, 1080p, 2160p, 3D)
- Filter by minimum rating
- Sort by date added, title, year, rating, or download count

### 📱 **Responsive Design**
- Desktop: Two-pane layout with movie list on left, details on right
- Mobile: Stack layout with easy navigation between list and details
- Optimized for all screen sizes

### 🎨 **Beautiful UI**
- Green color theme (#6AC045) throughout
- DaisyUI components for consistent styling
- Smooth animations and hover effects
- Dark theme support

### 📥 **Download Options**
- Multiple quality options (480p to 2160p)
- Magnet links for direct torrent client opening
- .torrent file downloads
- File size and codec information
- Seed/peer counts

### 📊 **Detailed Movie Information**
- High-resolution movie posters
- Plot summaries and cast information
- Technical details (runtime, rating, codec, etc.)
- YouTube trailer links
- IMDB integration
- Download statistics

## Screenshots

*Note: Add screenshots of the application here once available*

### Desktop Layout
![Desktop View](./screenshots/desktop-view.png)

### Mobile Layout
![Mobile View](./screenshots/mobile-view.png)

### Movie Details
![Movie Details](./screenshots/movie-details.png)

## Tech Stack

- **Frontend**: SvelteKit with TypeScript
- **Styling**: TailwindCSS + DaisyUI
- **Build Tool**: Vite
- **Package Manager**: Bun
- **API**: YTS (Yet Another Torrent Site) API

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yts-easy
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## Usage

### Browsing Movies
1. **View Movies**: The left pane shows a scrollable list of movies
2. **Select Movie**: Click on any movie to view detailed information in the right pane
3. **Infinite Scroll**: Scroll down to automatically load more movies

### Searching and Filtering
1. **Search**: Use the search bar to find movies by title
2. **Filter by Genre**: Select from 20+ genre options
3. **Filter by Quality**: Choose specific video quality requirements
4. **Filter by Rating**: Set minimum IMDB rating threshold
5. **Sort Results**: Order by date, title, year, rating, or popularity

### Downloading
1. **Choose Quality**: Each movie shows available quality options
2. **Magnet Links**: Click the magnet icon for instant torrent client opening
3. **Torrent Files**: Click the download icon to download .torrent files
4. **File Info**: View file sizes, codecs, and seed/peer counts

### Mobile Usage
- **Navigation**: Use the back arrow to return to the movie list
- **Touch-Friendly**: All buttons and interactions optimized for touch
- **Responsive**: Layouts adapt automatically to screen size

## Development

### Project Structure
```
src/
├── app.css                 # Global styles and DaisyUI theme
├── app.html               # HTML template
├── lib/
│   └── components/
│       ├── MovieList.svelte    # Left pane - movie browsing
│       └── MovieInfo.svelte    # Right pane - movie details
└── routes/
    ├── +layout.svelte     # App layout
    └── +page.svelte       # Main page component
```

### Key Components

#### MovieList.svelte
- Handles movie fetching from YTS API
- Implements infinite scroll
- Manages search and filter state
- Responsive movie cards with download options

#### MovieInfo.svelte
- Displays detailed movie information
- Shows download options with technical details
- Responsive design for mobile/desktop

### API Integration
The app uses the YTS API endpoints:
- `/api/v2/list_movies.json` - Movie listing and search
- Parameters: `query_term`, `genre`, `quality`, `minimum_rating`, `sort_by`, `page`

### Styling
- **Theme**: Green primary color (#6AC045) throughout
- **Framework**: TailwindCSS with DaisyUI components
- **Responsive**: Mobile-first approach with desktop enhancements
- **Dark Mode**: Supported via DaisyUI theme system

### Development Commands

### Development Commands

```bash
# Start development server
bun run dev
# or
npm run dev

# Start dev server and open browser
bun run dev -- --open
# or
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
bun run build
# or
npm run build
```

You can preview the production build with:
```bash
bun run preview
# or
npm run preview
```

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Make changes**: Follow the existing code style and conventions
4. **Test thoroughly**: Ensure all features work on desktop and mobile
5. **Submit a pull request**: Describe your changes clearly

### Code Style
- Use TypeScript for all new code
- Follow Svelte conventions for component structure
- Use Tailwind classes instead of custom CSS when possible
- Maintain the green color theme (#6AC045)
- Ensure responsive design for all new features

### Adding Features
- **New Filters**: Add to the `filters` object and update API calls
- **UI Components**: Use DaisyUI components for consistency
- **API Changes**: Update both MovieList and MovieInfo components as needed
- **Mobile Support**: Always test on mobile devices

## API Reference

### YTS API Endpoints Used
- **Base URL**: `https://yts.mx/api/v2/`
- **List Movies**: `list_movies.json`
- **Parameters**:
  - `query_term`: Search query
  - `genre`: Movie genre filter
  - `quality`: Video quality filter
  - `minimum_rating`: Minimum IMDB rating
  - `sort_by`: Sort order
  - `page`: Pagination

## License

This project is for educational purposes. Please respect copyright laws and use responsibly.

## Acknowledgments

- **YTS**: For providing the movie database API
- **SvelteKit**: For the amazing framework
- **DaisyUI**: For the beautiful UI components
- **TailwindCSS**: For the utility-first CSS framework

## Support

If you encounter any issues or have suggestions:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include screenshots for UI-related problems
4. Specify browser and device information
