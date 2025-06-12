import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSchema, User } from '../types';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

import { initAuth } from '../services/initAuth';
import { logoutUser } from '../services/logoutUser';
import { registerUser } from 'features/RegisterUser/model/services/registerUser';

const initialState: AuthSchema = {
  authData: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = { ...action.payload };
      state.error = null;
    },
    clearAuthData: (state) => {
      state.authData = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔐 Login
      .addCase(loginByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginByUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = { ...action.payload };
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      // 🧾 Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = { ...action.payload };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })

      // 🔁 Init Auth
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = { ...action.payload };
      })
      .addCase(initAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Auth check failed';
      })

      // 🚪 Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.authData = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
