import { getAccessToken, setAccessToken, clearAccessToken } from "../../features/AuthByUsername/model/services/authService";


export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = getAccessToken();

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    if (res.status === 401 || res.status === 403) {
        // ვცდილობთ refresh-ს
        const refreshRes = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            setAccessToken(data.accessToken);

            // retry request
            return authFetch(url, options);
        } else {
            clearAccessToken();
            throw new Error("Session expired");
        }
    }

    return res;
};
