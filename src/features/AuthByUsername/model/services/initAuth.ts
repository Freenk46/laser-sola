import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken } from '../services/authService'; // ✅ არა dispatch!
import { User } from 'entities/User';
import { setAuthData } from '../slice/authSlice';


const BASE_URL = 'http://localhost:5000';

export const initAuth = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/initAuth', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // cookie გადმოსაწოდებლად
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue('Refresh failed');
    }

    const data = await res.json();

    // ✅ შენახე accessToken localStorage-ში
    setAccessToken(data.accessToken);

    // ✅ შეინახე მომხმარებელი redux-ში
    thunkAPI.dispatch(setAuthData({
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      roles: data.user.roles,
      isBanned: data.user.isBanned,
    }));

    return {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      roles: data.user.roles,
      isBanned: data.user.isBanned,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue('Auth check failed');
  }
});
