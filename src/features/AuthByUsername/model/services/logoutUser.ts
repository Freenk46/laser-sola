import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearTokens } from './authService';
import { logout } from '../slice/authSlice';
const BASE_URL = 'https://khsol-nest.onrender.com';
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      // სერვერზე optional logout თხოვნა (თუ არსებობს)
      await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refreshToken'), // თუ ასე ინახავ
        }),
      });

      clearTokens(); // წაშალე localStorage-დან ორივე token-ი
      thunkAPI.dispatch(logout()); // გაწმინდე Redux authData
    } catch (error) {
      clearTokens();
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);
