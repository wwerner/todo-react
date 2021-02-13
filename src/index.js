import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Pond } from '@actyx-contrib/react-pond';

function Waiting() {
  return (
    <div className="loading">
      Waiting for connection to ActyxOS on localhost — is it running?
      <br />
      You may need to reload after starting ActyxOS.
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Pond loadComponent={<Waiting />}>
      <App />
    </Pond>
  </React.StrictMode>,
  document.getElementById('root')
);
