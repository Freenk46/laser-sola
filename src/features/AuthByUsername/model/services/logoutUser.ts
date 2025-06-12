import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearTokens } from './authService';

const BASE_URL = 'http://localhost:5000';
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
      thunkAPI.dispatch(logoutUser()); // გაწმინდე Redux authData
    } catch (error) {
      clearTokens();
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);
