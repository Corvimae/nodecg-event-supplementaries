import React from 'react';
import ReactDOM from 'react-dom/client';
import { CountdownApp } from '../apps/CountdownApp';

const root = ReactDOM.createRoot(document.querySelector('#app') as Element);

root.render(
  <React.StrictMode>
    <CountdownApp />
  </React.StrictMode>
);