import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { animalApi } from './api/animal.api';
import { authApi } from './api/auth.api';
import { shelterApi } from './api/shelter.api';
import { userApi } from './api/user.api';
import { animalsFilterReducer } from './slices/animals-filter.slice';
import { themeReducer } from './slices/theme.slice';
import { userReducer } from './slices/user.slice';
import { chatReducer } from './slices/chat.slice';
import { chatApi } from './api/chat.api';

export const store = configureStore({
  reducer: combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [animalApi.reducerPath]: animalApi.reducer,
    [shelterApi.reducerPath]: shelterApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    themeReducer,
    userReducer,
    animalsFilterReducer,
    chatReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      animalApi.middleware,
      shelterApi.middleware,
      authApi.middleware,
      chatApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
