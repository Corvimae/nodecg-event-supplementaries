import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContentWarningApp } from '../apps/ContentWarningApp';

const root = ReactDOM.createRoot(document.querySelector('#app') as Element);

root.render(
  <React.StrictMode>
    <ContentWarningApp />
  </React.StrictMode>
);