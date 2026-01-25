import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchFeed = createAsyncThunk<
  {
    orders: TOrder[];
    total: number;
    totalToday: number;
  },
  void,
  { rejectValue: null }
>('fetchFeed', async (ids, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (e) {
    return rejectWithValue(null);
  }
});
