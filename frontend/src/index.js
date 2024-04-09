import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RoleProvider } from './RoleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoleProvider>
    <App />
    </RoleProvider>
  </React.StrictMode>
);

