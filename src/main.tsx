import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { TechReelProvider } from './context/TechReelContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TechReelProvider>
      <App />
    </TechReelProvider>
  </StrictMode>
);
