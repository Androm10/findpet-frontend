import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { userApi } from './api/user.api';
import { themeReducer } from './slices/theme.slice';

export const store = configureStore({
  reducer: combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    themeReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
