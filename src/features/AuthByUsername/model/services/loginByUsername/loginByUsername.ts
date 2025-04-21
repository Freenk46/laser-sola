import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import { setAccessToken, setRefreshToken } from '../authService';
import { setAuthData } from '../../slice/authSlice';

const BASE_URL = 'https://khsol-nest.onrender.com';
interface LoginParams {
  email: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginParams,
  { rejectValue: string }
>('auth/loginByUsername', async ({ email, password }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message || 'შეცდომა ავტორიზაციისას');
    }

    const data = await res.json();

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    thunkAPI.dispatch(setAuthData(data.user));

    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue('ქსელური შეცდომა');
  }
});
