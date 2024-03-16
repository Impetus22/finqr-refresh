import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}> {/* TODO: settare true in caso di https */}
    <Router>
      <App />
    </Router>
    </AuthProvider>
  ,
)
