import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { CalendarProvider } from './context/CalendarContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CalendarProvider>
        <App />
      </CalendarProvider>
    </AuthProvider>
  </React.StrictMode>
);
