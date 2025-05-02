import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the React application to the root DOM element
root.render(
  <React.StrictMode>
    {/* Toaster component for displaying toast notifications */}
    <Toaster />
    {/* Main application component */}
    <App />
  </React.StrictMode>
);
