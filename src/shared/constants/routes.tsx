import Layout from 'components/layout/layout/layout';
import DevPage from 'pages/dev';
import HomePage from 'pages/home';
import PetsPage from 'pages/pets';
import { createBrowserRouter } from 'react-router-dom';

export const routes = {
  home: '/',
  dev: 'dev',
  pets: 'pets',
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
      {
        path: routes.pets,
        element: <PetsPage />,
      },
    ],
  },
  {},
]);
