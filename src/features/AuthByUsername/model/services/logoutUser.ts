import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearAccessToken } from './authService';

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            // optional: სერვერზე logout API თუ გექნება
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.warn('Logout API failed, fallback to local clear');
        } finally {
            clearAccessToken(); // ვშლით access token-ს
        }
    },
);
