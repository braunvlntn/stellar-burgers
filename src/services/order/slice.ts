import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrder } from './thunks';

interface OrderSliceState {
  request: boolean;
  modalData: TOrder | null;
}

const initialState: OrderSliceState = {
  request: false,
  modalData: null
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
  }
});
