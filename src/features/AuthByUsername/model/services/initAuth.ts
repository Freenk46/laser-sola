import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken } from './authService';
import { setAuthData } from '../slice/authSlice';
import { User } from '../types';

const BASE_URL = 'https://khsol-nest.onrender.com';

export const initAuth = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/initAuth', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue('Refresh failed');
    }

    const data = await res.json();
    setAccessToken(data.accessToken);
    thunkAPI.dispatch(setAuthData(data.user));

    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue('Auth check failed');
  }
});
