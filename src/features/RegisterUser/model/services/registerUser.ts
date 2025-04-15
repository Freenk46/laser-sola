import { createAsyncThunk } from '@reduxjs/toolkit';

interface RegisterParams {
    name: string;
    email: string;
    password: string;
}

export const registerUser = createAsyncThunk(
    'registerUser/registerUser',
    async ({ name, email, password }: RegisterParams, thunkAPI) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                return thunkAPI.rejectWithValue(error.message);
            }

            return await res.json();
        } catch (err) {
            return thunkAPI.rejectWithValue('Registration failed');
        }
    },
);
