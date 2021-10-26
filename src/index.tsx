import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/global';
import CountriesProvider from './context/CountriesContext';

ReactDOM.render(
  <React.StrictMode>
    <CountriesProvider>
    <GlobalStyle />
    <App />
    </CountriesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);