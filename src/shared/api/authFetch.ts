import {
    getAccessToken,
    setAccessToken,
    clearTokens,
  } from 'features/AuthByUsername/model/services/authService';
  
  export const authFetch = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const token = getAccessToken();
  
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  
    if (res.status === 401 || res.status === 403) {
      try {
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include', // ✅ cookie-დან წასაკითხად
        });
  
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setAccessToken(data.accessToken);
  
          // Retry original request
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
  