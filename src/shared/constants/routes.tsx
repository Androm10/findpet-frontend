import Layout from 'components/layout/layout/layout';
import DevPage from 'pages/dev';
import HomePage from 'pages/home';
import { createBrowserRouter } from 'react-router-dom';

export const routes = {
  home: '/',
  dev: 'dev',
  page1: 'page1',
  page2: 'page2',
  page3: 'page3',
};

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.dev,
        element: <DevPage />,
      },
    ],
  },
  {},
]);
