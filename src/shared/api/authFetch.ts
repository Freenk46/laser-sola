import { getAccessToken } from 'features/AuthByUsername/model/services/authService';

export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = getAccessToken();

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    return res;
};
