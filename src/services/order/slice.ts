import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrder, fetchUserOrders } from './thunks';

interface OrderSliceState {
  request: boolean;
  modalData: TOrder | null;
  userOrders: TOrder[];
}

const initialState: OrderSliceState = {
  request: false,
  modalData: null,
  userOrders: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.request = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, { payload }) => {
      state.modalData = payload;

      state.request = false;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.request = false;
    });
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.request = true;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, { payload }) => {
      state.userOrders = payload;

      state.request = false;
    });
    builder.addCase(fetchUserOrders.rejected, (state) => {
      state.request = false;
    });
  }
});
