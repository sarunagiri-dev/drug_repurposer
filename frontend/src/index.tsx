import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const initializeApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Failed to find the root element');
    document.body.innerHTML = '<div>Error: Root element not found</div>';
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error('Failed to render React app:', error);
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Error: Failed to load application';
    document.body.appendChild(errorDiv);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}