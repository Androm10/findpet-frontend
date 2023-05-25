import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './shared/store';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '@shared/constants/routes';
import App from 'App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
