import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../services/registerUser';

interface RegisterState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: RegisterState = {
    loading: false,
    success: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'registerUser',
    initialState,
    reducers: {
        resetRegisterState(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
export type { RegisterState };
