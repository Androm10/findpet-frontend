import Layout from 'components/layout/layout/layout';
import ShelterForm from 'components/shelter/shelter-form';
import AnimalPage from 'pages/animal';
import CreateAnimalPage from 'pages/create-animal';
import CreateShelterPage from 'pages/create-shelter';
import DevPage from 'pages/dev';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import PetsPage from 'pages/pets';
import ShelterPage from 'pages/shelter';
import SheltersPage from 'pages/shelters';
import SignupPage from 'pages/signup';
import { createBrowserRouter } from 'react-router-dom';

export const routes = {
  home: '/',
  dev: 'dev',
  pets: 'pets',
  animal: 'animal/',
  createAnimal: 'animal-create/',
  shelter: 'shelter/',
  createShelter: 'shelter-create/',
  shelters: 'shelters',
  login: '/login',
  signup: '/signup',
};

export const router = createBrowserRouter([
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.signup,
    element: <SignupPage />,
  },
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
        path: `${routes.shelter}:id`,
        element: <ShelterPage />,
      },
      {
        path: `${routes.animal}:id`,
        element: <AnimalPage />,
      },
      {
        path: routes.createShelter,
        element: <CreateShelterPage />,
      },
      {
        path: routes.createAnimal,
        element: <CreateAnimalPage />,
      },
    ],
  },
]);
