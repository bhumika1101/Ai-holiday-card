import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import LoaderProvider from './context/Loader/LoaderProvider';
import ThemeProvider from './context/ThemeProvider';
import { HashRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <LoaderProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LoaderProvider>
  </HashRouter>
);
