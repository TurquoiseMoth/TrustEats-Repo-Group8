import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'

const queryClient = new QueryClient()

function Root() {
  useEffect(() => {
    // Initialize services from environment variable if present (optional)
    const apiBase = (import.meta.env.VITE_API_BASE_URL as string) || '';
    if (apiBase) {
      import('./services').then((m) => m.initializeServices({ apiBaseUrl: apiBase }));
    }

    // Mount a tiny global toast listener for trusteats:notify events
    function mountToastListener() {
      if (typeof window === 'undefined') return;
      if ((window as any).__trusteats_toast_initialized) return;
      (window as any).__trusteats_toast_initialized = true;

      const container = document.createElement('div');
      container.id = 'trusteats-toast-container';
      container.style.position = 'fixed';
      container.style.top = '20px';
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      container.style.zIndex = '9999';
      document.body.appendChild(container);

      window.addEventListener('trusteats:notify', (e: Event) => {
        const ev = e as CustomEvent<{ type: string; message: string }>;
        const detail = ev.detail || { type: 'info', message: '' };
        const el = document.createElement('div');
        el.textContent = detail.message;
        el.style.padding = '10px 16px';
        el.style.borderRadius = '8px';
        el.style.color = 'white';
        el.style.marginTop = '6px';
        el.style.boxShadow = '0 6px 18px rgba(17,24,39,0.08)';
        el.style.maxWidth = 'min(80vw, 640px)';
        el.style.fontFamily = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        if (detail.type === 'error') el.style.background = '#dc2626';
        else if (detail.type === 'success') el.style.background = '#16a34a';
        else el.style.background = '#111827';

        container.appendChild(el);
        setTimeout(() => {
          el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          el.style.opacity = '0';
          el.style.transform = 'translateY(-6px)';
          setTimeout(() => container.removeChild(el), 380);
        }, 3500);
      });
    }

    mountToastListener();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
