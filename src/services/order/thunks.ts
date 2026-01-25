import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: null }
>('fetchOrder', async (ids, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ids);

    return response.order;
  } catch (e) {
    return rejectWithValue(null);
  }
});
