import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthState = (state: StateSchema) => state.auth;

export const getAuthData = createSelector(
  getAuthState,
  (auth) => auth.authData
);