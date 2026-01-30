import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { fetchLogin } from './thunks';
import { fetchRegistration } from './thunks';
import { fetchLogout } from './thunks';
import { fetchUpdateUser } from './thunks';

interface UserSliceState {
  user: TUser | null;
  loading: boolean;
}

const initialState: UserSliceState = {
  user: null,
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      state.user = payload;

      state.loading = false;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchRegistration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRegistration.fulfilled, (state, { payload }) => {
      state.user = payload;

      state.loading = false;
    });
    builder.addCase(fetchRegistration.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
    });
    builder.addCase(fetchLogout.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchUpdateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    });
    builder.addCase(fetchUpdateUser.rejected, (state) => {
      state.loading = false;
    });
  }
});
