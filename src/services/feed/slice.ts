import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeed } from './thunks';

interface FeedSliceState {
  loading: boolean;
  data: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  } | null;
  order: TOrder | null;
}

const initialState: FeedSliceState = {
  loading: false,
  data: null,
  order: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setOrder: (state, { payload }: PayloadAction<FeedSliceState['order']>) => {
      state.order = payload;
    },
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFeed.fulfilled, (state, { payload }) => {
      state.data = payload;

      state.loading = false;
    });
    builder.addCase(fetchFeed.rejected, (state) => {
      state.loading = false;
    });
  }
});
