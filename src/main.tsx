// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';   // assumes App.tsx is reachable at src/App.tsx or at project root; see note below
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
