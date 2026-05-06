import React from 'react';
import ReactDOM from 'react-dom/client';
import { LowerThirdsApp } from '../apps/LowerThirdsApp';

const root = ReactDOM.createRoot(document.querySelector('#app') as Element);

root.render(
  <React.StrictMode>
    <LowerThirdsApp />
  </React.StrictMode>
);