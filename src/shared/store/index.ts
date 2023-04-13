import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { themeReducer } from './slices/theme.slice';

export const store = configureStore({
  reducer: combineReducers({
    themeReducer,
  }),
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
