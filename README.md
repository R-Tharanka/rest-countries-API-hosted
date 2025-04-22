
# REST Countries Explorer

This project is a full-stack web application that allows users to explore information about countries, search and filter them, and manage a list of favorite countries. It consists of a **frontend** built with React and Tailwind CSS and a **backend** built with Node.js, Express, and MongoDB.

## Features

### Frontend
- **Home Page**: Displays a list of countries with search and filter functionality.
- **Country Details**: View detailed information about a specific country, including its flag, population, region, and more.
- **Favorites**: Logged-in users can add or remove countries from their favorites list.
- **Authentication**: Users can register, log in, and log out.

### Backend
- **User Authentication**: Register and log in with secure password hashing and JWT-based authentication.
- **Favorites Management**: APIs to add, remove, and fetch favorite countries for authenticated users.

---

## Project Structure

### Frontend
The frontend is located in the `frontend` folder and has the following structure:
```
frontend/
├── src/
│   ├── components/
│   │   ├── ControlsBar.jsx
│   │   ├── CountryCard.jsx
│   │   └── Header.jsx
│   ├── pages/
│   │   ├── CountryDetail.jsx
│   │   ├── Favorites.jsx
│   │   ├── HomePage.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   ├── auth.js
│   │   ├── countries.js
│   │   └── favorites.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
└── tailwind.config.js
```

### Backend
The backend is located in the `backend` folder and has the following structure:
```
backend/
├── models/
│   └── User.js
├── middleware/
│   └── auth.js
├── routes/
│   └── auth.js
├── server.js
├── .env
└── package.json
```

---

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `backend` folder with the following variables:
    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup
1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm start
    ```

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in and receive a JWT token.

### Favorites
- **GET** `/api/auth/favorites`: Get the list of favorite countries (requires authentication).
- **POST** `/api/auth/favorites`: Add a country to favorites (requires authentication).
- **DELETE** `/api/auth/favorites/:code`: Remove a country from favorites (requires authentication).

---

## Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- JWT for authentication
- bcrypt.js for password hashing

---

## How to Use

1. **Register**: Create an account on the platform.
2. **Log In**: Log in to access personalized features like managing favorites.
3. **Explore Countries**: Use the search bar or filter dropdown to find countries.
4. **View Details**: Click on a country card to view detailed information.
5. **Manage Favorites**: Add or remove countries from your favorites list.

---

## License
This project is licensed under the MIT License.

---

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)
