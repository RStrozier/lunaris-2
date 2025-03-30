import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { LoadingProvider } from './context/LoadingContext';
import { ErrorProvider } from './context/ErrorContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <LoadingProvider>
    <ErrorProvider>
      <App />
      </ErrorProvider>
    </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);