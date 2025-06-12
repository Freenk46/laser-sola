const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const setAccessToken = (token: string) => localStorage.setItem(ACCESS_KEY, token);
export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_KEY, token);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};