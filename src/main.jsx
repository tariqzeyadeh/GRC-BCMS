import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import './i18n/i18n';
import App from './App.jsx';
import { ThemeProvider, SidebarProvider } from './context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
