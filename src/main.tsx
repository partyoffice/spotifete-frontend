import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './components/UserProvider';

const container = document.getElementById('root')!;
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
