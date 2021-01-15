import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/reset.css';
import './assets/styles/border.css';
import './assets/styles/common.css';
import './assets/fonts/iconfont/iconfont.css';
import './assets/scripts/common';

import App from './App';

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById('root')
);
