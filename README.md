# Aklatan ng mga Kwento 📚

A beautiful Filipino children's book library interface inspired by game launchers like Steam. Features a 3D carousel with depth effects for browsing classic Filipino children's books.

## Features ✨

- **3D Book Carousel**: Browse books with a depth effect similar to game libraries
- **Search Functionality**: Search books by title or author in Filipino
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Seamless transitions using Framer Motion
- **Filipino Theme**: Minimalist design with warm earth tones inspired by Filipino materials (narra wood, bamboo, rice paper)
- **Book Details View**: Click a book to see detailed information with smooth transitions

## Design Inspiration 🎨

- **Color Palette**: Warm earth tones (Narra wood brown, bamboo, carabao leather)
- **Style**: Minimalist Filipino aesthetic with children's book vibes
- **Interaction**: Game library-style navigation (left/right scrolling)

## Tech Stack 🛠️

- **React 19** - UI Framework
- **Vite** - Build tool
- **Framer Motion** - Animations and transitions
- **CSS3** - 3D transforms and modern styling

## Getting Started 🚀

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure 📁

```
src/
├── components/
│   ├── BookCarousel.jsx      # Main carousel component
│   ├── BookCarousel.css       # 3D carousel styles
│   ├── SearchBar.jsx          # Search functionality
│   └── SearchBar.css          # Search bar styles
├── App.jsx                    # Main app component
├── App.css                    # App-level styles
└── index.css                  # Global styles & theme
```

## Customization 🎨

### Adding Books

Edit the `booksData` array in `src/components/BookCarousel.jsx`:

```javascript
const booksData = [
  {
    id: 1,
    title: "Your Book Title",
    author: "Author Name",
    cover: "image-url.jpg"
  },
  // Add more books...
];
```

### Theme Colors

Modify CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #8B7355;  /* Narra wood brown */
  --secondary-color: #D4A574; /* Light bamboo */
  --accent-color: #C19A6B;    /* Carabao leather */
  --bg-color: #FAF7F2;        /* Rice paper */
}
```

## Future Enhancements 🚧

- Backend integration for dynamic book data
- User authentication and personal library
- Book reading interface
- Favorites and reading progress tracking
- More interactive animations
- Sound effects for page transitions

## License 📄

MIT

---

Made with ❤️ for Filipino children's literature

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
