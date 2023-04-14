import Layout from 'components/layout/layout/layout';
import DevPage from 'pages/dev';
import HomePage from 'pages/home';
import Page1 from 'pages/page1';
import Page2 from 'pages/page2';
import Page3 from 'pages/page3';
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
      {
        path: routes.page1,
        element: <Page1 />,
      },
      {
        path: routes.page2,
        element: <Page2 />,
      },
      {
        path: routes.page3,
        element: <Page3 />,
      },
    ],
  },
  {},
]);
