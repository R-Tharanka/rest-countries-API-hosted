# REST Countries Explorer Frontend

A modern React application that allows users to explore information about countries worldwide, with features for searching, filtering, and managing favorite countries.

## Features

- **Country Exploration**: Browse, search, and filter countries
- **Interactive Globe**: 3D globe visualization using amCharts
- **Detailed Country Information**: View comprehensive details about each country
- **User Authentication**: Secure login and registration system
- **Favorites Management**: Save and manage favorite countries (requires authentication)
- **Responsive Design**: Fully responsive UI using Tailwind CSS
- **Toast Notifications**: User-friendly notifications using react-hot-toast
- **Back to Top**: Smooth scroll functionality for better UX

## Technology Stack

- **React**: ^19.1.0
- **React Router DOM**: ^7.5.3
- **amCharts 5**: Interactive data visualization
- **Tailwind CSS**: Utility-first CSS framework
- **React Hot Toast**: Notifications system
- **Lucide React**: Icon components

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── BackToTop.jsx    # Scroll to top functionality
│   ├── ControlsBar.jsx  # Search and filter controls
│   ├── CountryCard.jsx  # Country display card
│   ├── Globe.jsx        # Interactive 3D globe
│   ├── Header.jsx       # Application header
│   └── ProtectedRoute.jsx # Route protection logic
├── pages/               # Main application pages
│   ├── HomePage.jsx     # Landing page
│   ├── CountryDetail.jsx # Country details page
│   ├── Favorites.jsx    # User favorites page
│   ├── Login.jsx        # Login page
│   └── Register.jsx     # Registration page
├── services/           # API and data services
│   ├── auth.js         # Authentication service
│   ├── countries.js    # Countries API service
│   ├── favorites.js    # Favorites management
│   └── fetchWithAuth.js # Authenticated API requests
└── utils/             # Utility functions
    └── handleAuthError.js # Auth error handling
```

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the project root with:
   ```
   PORT=3001
   ```

3. **Development**
   ```bash
   npm start
   ```
   The application will run on http://localhost:3001

4. **Testing**
   ```bash
   npm test
   ```

## Component Documentation

### Core Components

- **ControlsBar**: Provides search and filtering functionality
  - Search by country name
  - Filter by region (Africa, Americas, Asia, Europe, Oceania)
  - Filter by language (English, Spanish, French, Arabic, Chinese)

- **Globe**: Interactive 3D globe visualization
  - Auto-rotation feature
  - Country hover effects
  - Responsive sizing

- **CountryCard**: Displays country information
  - Flag display
  - Basic country details
  - Click through to detailed view

### Authentication Components

- **ProtectedRoute**: Route protection for authenticated features
  - JWT token validation
  - Automatic redirection to login
  - Session management

### Page Components

- **HomePage**: Main landing page with country listing
- **CountryDetail**: Detailed country information display
- **Favorites**: Protected page for managing favorite countries
- **Login/Register**: User authentication pages

## Testing

The project includes comprehensive test coverage using Jest and React Testing Library. Tests are organized alongside their components:

```
__tests__/
├── components/        # Component tests
└── pages/            # Page component tests
```

Run tests with:
```bash
npm test
```

## Build

To create a production build:
```bash
npm run build
```

## API Integration

The frontend integrates with:
- REST Countries API for country data
- Custom backend for authentication and favorites management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
