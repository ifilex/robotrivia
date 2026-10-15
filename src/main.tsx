import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent benign ResizeObserver loop notifications from triggering runtime error overlays
window.addEventListener('error', (e: ErrorEvent) => {
  if (
    typeof e?.message === 'string' &&
    (e.message.includes('ResizeObserver loop') || e.message.includes('undelivered notifications'))
  ) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

