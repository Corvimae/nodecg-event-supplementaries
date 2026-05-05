import React from 'react';
import ReactDOM from 'react-dom/client';
import { HostApp } from '../apps/HostApp';

const root = ReactDOM.createRoot(document.querySelector('#app') as Element);

root.render(
  <React.StrictMode>
    <HostApp />
  </React.StrictMode>
);