import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider, useLoading } from "./context/LoadingContext.jsx";
import { setGlobalLoadingSetter } from './api/blogApi';

function LoaderInit() {
  const { setLoading } = useLoading();

  React.useEffect(() => {
    setGlobalLoadingSetter(setLoading);
  }, [setLoading]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <LoaderInit />
          <App />
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
