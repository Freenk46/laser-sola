import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { logoutUser } from '../services/logoutUser';
import { AuthSchema, User } from '../types';

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
            state.authData = action.payload;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.authData = action.payload; // { id, name, email }
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.authData = null;
            });
    },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
