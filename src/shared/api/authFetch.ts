import {
  getAccessToken,
  setAccessToken,
  clearTokens,
} from 'features/AuthByUsername/model/services/authService';

const BASE_URL = 'http://localhost:5000'; // ან .env variable

export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json', // ✅ თუ JSON აგზავნი
    },
    credentials: 'include', // always send cookies
  });

  // 🔁 Retry logic
  if (res.status === 401 || res.status === 403) {
    debugger
    try {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setAccessToken(data.accessToken);

        // Retry original request with new token
        return authFetch(url, options);
      }

      clearTokens();
      throw new Error('Refresh token expired or invalid');
    } catch (err) {
      clearTokens();
      throw new Error('Refresh flow failed');
    }
  }

  return res;
};
