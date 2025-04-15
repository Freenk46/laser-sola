import { getAccessToken, setAccessToken, clearAccessToken } from 'features/AuthByUsername/model/services/authService';

/**
 * authFetch wrapper with refresh token support
 * @param url - API endpoint
 * @param options - fetch options
 * @returns Response
 */
export const authFetch = async (
    url: string,
    options: RequestInit = {},
): Promise<Response> => {
    const token = getAccessToken();

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    // If access token is invalid/expired
    if (res.status === 401 || res.status === 403) {
        try {
            const refreshRes = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                setAccessToken(data.accessToken);

                // Retry original request
                return authFetch(url, options);
            }
            clearAccessToken();
            throw new Error('Refresh token expired or invalid');
        } catch (err) {
            clearAccessToken();
            throw new Error('Refresh flow failed');
        }
    }

    return res;
};
