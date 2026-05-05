import React from 'react';
import ReactDOM from 'react-dom/client';
import { FoobarNowPlayingApp } from '../apps/FoobarNowPlayingApp';

const root = ReactDOM.createRoot(document.querySelector('#app') as Element);

root.render(
  <React.StrictMode>
    <FoobarNowPlayingApp />
  </React.StrictMode>
);