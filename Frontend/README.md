# AffordMed URL Shortener

A modern, responsive URL shortener built with React and Vite. Transform long URLs into short, shareable links with a clean and intuitive interface.

## Features

- 🚀 **Lightning Fast** - Generate short URLs in milliseconds
- 🔒 **Secure & Reliable** - Built with modern security practices
- 📱 **Responsive Design** - Works perfectly on all devices
- 📊 **URL History** - Keep track of your shortened URLs
- 📋 **One-Click Copy** - Easy clipboard integration
- 🌐 **No Registration Required** - Start shortening URLs immediately

## Demo

The application includes a demo mode that works without a backend API. When the API is not available, it generates mock short URLs for demonstration purposes.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your configuration:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_NAME=AffordMed URL Shortener
REACT_APP_SHORT_DOMAIN=short.ly
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Application header
│   ├── Footer.jsx      # Application footer
│   └── UrlShortener.jsx # Main URL shortener component
├── utils/              # Utility functions
│   ├── api.js          # API configuration and endpoints
│   └── helpers.js      # Helper functions
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## API Integration

The application is designed to work with any REST API that provides URL shortening functionality. The expected API endpoints are:

### POST /api/shorten
Shorten a URL

**Request:**
```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "https://short.ly/abc123",
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "abc123"
}
```

### GET /api/url/:shortCode
Get URL information (optional, for analytics)

**Response:**
```json
{
  "shortUrl": "https://short.ly/abc123",
  "originalUrl": "https://example.com/very/long/url",
  "clicks": 42,
  "createdAt": "2025-01-01T00:00:00Z"
}
```

## Customization

### Styling
The application uses CSS custom properties (variables) for easy theming. You can customize colors and spacing by modifying the variables in `src/index.css`.

### API Configuration
Update `src/utils/api.js` to modify API endpoints, add authentication, or change request/response handling.

### Features
The application supports feature flags through environment variables:
- `REACT_APP_ENABLE_ANALYTICS` - Enable click tracking
- `REACT_APP_ENABLE_CUSTOM_DOMAINS` - Enable custom short domains

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Icons and design inspiration from modern UI/UX practices

## Support

For support, email support@affordmed.com or create an issue in this repository.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
