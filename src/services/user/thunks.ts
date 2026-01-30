import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';

export const fetchLogin = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: null | string }
>('fetchLogin', async (loginData, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(loginData);

    return response.user;
  } catch (error) {
    const message = (error as { message?: string }).message;

    if (message) {
      return rejectWithValue(message);
    }

    return rejectWithValue(null);
  }
});

export const fetchRegistration = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: null | string }
>('fetchRegistration', async (registerData, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(registerData);

    return response.user;
  } catch (error) {
    const message = (error as { message?: string }).message;

    if (message) {
      return rejectWithValue(message);
    }

    return rejectWithValue(null);
  }
});

export const fetchLogout = createAsyncThunk<void, void>(
  'fetchLogout',
  async () => {
    try {
      await logoutApi();
    } catch {}
  }
);

export const fetchUpdateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: null | string }
>('fetchUpdateUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(userData);

    return response.user;
  } catch (error) {
    const message = (error as { message?: string }).message;

    if (message) {
      return rejectWithValue(message);
    }

    return rejectWithValue(null);
  }
});
