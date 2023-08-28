import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

/**
 * Entry point for rendering the React application.
 * Uses ReactDOM.createRoot to render the application into the 'root' element.
 *
 * @param {HTMLElement} rootElement - The root HTML element to render the application into.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
