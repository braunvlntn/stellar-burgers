import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './thunks';
import { TIngredient } from '@utils-types';

interface IngredientsSliceState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
}

const initialState: IngredientsSliceState = {
  buns: [],
  mains: [],
  sauces: [],
  loading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
      if (!state.buns.length) {
        payload.forEach((ingredient) => {
          if (ingredient.type === 'bun') state.buns.push(ingredient);
          if (ingredient.type === 'main') state.mains.push(ingredient);
          if (ingredient.type === 'sauce') state.sauces.push(ingredient);
        });
      }

      state.loading = false;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.loading = false;
    });
  }
});
