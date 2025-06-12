import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken, setRefreshToken } from 'features/AuthByUsername/model/services/authService';
import { setAuthData } from 'features/AuthByUsername/model/slice/authSlice';


const BASE_URL = 'http://localhost:5000';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  any, RegisterParams, { rejectValue: string }
>('auth/register', async ({ name, email, password }, thunkAPI) => {
  try {
    debugger
    console.log('➡️ url', `${BASE_URL}/api/auth/registration`);
    const res =   await fetch(`${BASE_URL}/api/auth/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })
    debugger
    if (!res.ok) {
      const error = await res.json();
      return thunkAPI.rejectWithValue(error.message || 'Registration failed');
    }

    const data = await res.json();
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    thunkAPI.dispatch(setAuthData(data.user));
    debugger
    return data.user;
  } catch {
    return thunkAPI.rejectWithValue('Network error');
  }
});
