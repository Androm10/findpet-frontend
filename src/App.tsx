import s from './App.module.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '@shared/constants/routes';
import { useGetMeQuery } from '@shared/store/api/user.api';
import { useGetChatsQuery } from '@shared/store/api/chat.api';

function App() {
  useGetMeQuery();
  useGetChatsQuery();

  return <RouterProvider router={router} />;
}

export default App;
