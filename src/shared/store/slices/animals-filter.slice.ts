import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimalTypes } from 'core/entities/animal.entity';

interface AnimalsFilterState {
  type: keyof typeof AnimalTypes | null;
  sex: 'M' | 'G' | null;
  name: string;
}

const initialState: AnimalsFilterState = {
  type: null,
  sex: null,
  name: '',
};

export const animalsFilterSlice = createSlice({
  name: 'animals-filter',
  initialState,
  reducers: {
    setType(state, action: PayloadAction<keyof typeof AnimalTypes | null>) {
      state.type = action.payload;
    },
    setSex(state, action: PayloadAction<'M' | 'G' | null>) {
      state.sex = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const animalsFilterReducer = animalsFilterSlice.reducer;
export const animalsFilterActions = animalsFilterSlice.actions;
