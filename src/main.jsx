import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import './i18n/i18n';
import App from './App.jsx';
import { ThemeProvider, SidebarProvider, AuthProvider, AppDataProvider } from './context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppDataProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </AppDataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
