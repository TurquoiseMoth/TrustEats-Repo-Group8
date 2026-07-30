import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
<<<<<<< HEAD
=======
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
>>>>>>> b11a7705f9d3dab5c8a7c2c56fec5bc6fcf3a561

const rootElement = document.getElementById('root');

<<<<<<< HEAD
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
=======
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
>>>>>>> b11a7705f9d3dab5c8a7c2c56fec5bc6fcf3a561
