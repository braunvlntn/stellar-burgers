import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: null }
>('fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    return await getIngredientsApi();
  } catch (e) {
    return rejectWithValue(null);
  }
});
