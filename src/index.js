import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AxiosService from './components/config/config';

const axiosService = new AxiosService();

ReactDOM.render(
  <React.StrictMode>
    <App axiosService={axiosService} />
  </React.StrictMode>,
  document.getElementById('root')
);
