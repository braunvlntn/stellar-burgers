import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
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

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: null }
>('fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (e) {
    return rejectWithValue(null);
  }
});
