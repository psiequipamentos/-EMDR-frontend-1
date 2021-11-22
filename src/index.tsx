import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import Chat from './components/chat';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Routes />
    {/* <Chat></Chat> */}
  </React.StrictMode>,
  document.getElementById('root')
);