import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from 'core/entities/user.entity';
import { Coords } from 'core/types/coords.type';

interface UserState {
  user: UserEntity | null;
  location: Coords | null;
}

const initialState: UserState = {
  user: null,
  location: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserEntity | null>) {
      state.user = action.payload;
    },
    setLocation(state, action: PayloadAction<Coords | null>) {
      state.location = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
