import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { links } from './data';

// For the engineers who open DevTools on a portfolio.
console.log(
  '%cHi, fellow engineer.%c\nEverything here is hand-built: React, TypeScript and a raw WebGL galaxy (no 3D library).\nSource: %s\nHiring? %s',
  'font: 700 15px system-ui; color: #9fd0ff',
  'font: 13px system-ui; color: inherit',
  links.source,
  links.email,
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
