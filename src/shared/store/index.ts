import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { animalApi } from './api/animal.api';
import { shelterApi } from './api/shelter.api';
import { userApi } from './api/user.api';
import { themeReducer } from './slices/theme.slice';

export const store = configureStore({
  reducer: combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [animalApi.reducerPath]: animalApi.reducer,
    [shelterApi.reducerPath]: shelterApi.reducer,
    themeReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, animalApi.middleware, shelterApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
