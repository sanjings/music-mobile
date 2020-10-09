import React from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux'
import router from './router'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        { renderRoutes(router) }
      </HashRouter>
    </Provider>
  );
}

export default App;
