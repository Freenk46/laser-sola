import { createAsyncThunk } from '@reduxjs/toolkit';


import { setAuthData } from 'features/AuthByUsername/model/slice/authSlice';
import { User } from 'entities/User';
import { setAccessToken, setRefreshToken } from 'features/AuthByUsername/model/services/authService';
const BASE_URL = 'https://khsol-nest.onrender.com';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  User,
  RegisterParams,
  { rejectValue: string }
>('auth/registerUser', async ({ name, email, password }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // name არ იგზავნება backend-ში ამ ეტაპზე
    });

    if (!res.ok) {
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message || 'Registration failed');
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
