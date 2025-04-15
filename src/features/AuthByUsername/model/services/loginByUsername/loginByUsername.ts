import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import { setAccessToken } from '../../services/authService';

interface LoginParams {
    email: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginParams, { rejectValue: string }>(
    'auth/loginByUsername',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                return thunkAPI.rejectWithValue(error.message || 'Login failed');
            }

            const data = await response.json();

            // Save token locally
            setAccessToken(data.accessToken);

            return {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
            };
        } catch (err) {
            return thunkAPI.rejectWithValue('Network error');
        }
    },
);
