import Layout from 'components/layout/layout/layout';
import AnimalPage from 'pages/animal';
import DevPage from 'pages/dev';
import HomePage from 'pages/home';
import PetsPage from 'pages/pets';
import SheltersPage from 'pages/shelters';
import { createBrowserRouter } from 'react-router-dom';

export const routes = {
  home: '/',
  dev: 'dev',
  pets: 'pets',
  animal: 'animal/',
  shelters: 'shelters',
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
      {
        path: routes.shelters,
        element: <SheltersPage />,
      },
      {
        path: `${routes.animal}:id`,
        element: <AnimalPage />,
      },
    ],
  },
]);
