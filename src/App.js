import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import router from './router';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={null}>
          { renderRoutes(router) }
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
