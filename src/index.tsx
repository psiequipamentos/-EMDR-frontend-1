import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import Chat from './components/chat';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Routes />
    <ToastContainer />
    {/* <Chat></Chat> */}
  </React.StrictMode>,
  document.getElementById('root')
);