import Cookies from 'js-cookie';
import { isJwtExpired } from './AuthUtils';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export const fetchWithAuth = async (url: string, options: FetchOptions = {}): Promise<Response> => {
    const token = Cookies.get('authToken');

    if (token && isJwtExpired(token)) {
        Cookies.remove('authToken');
        window.location.href = '/';
        return Promise.reject(new Error('JWT expiré'));
    }

    const headers: HeadersInit = {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json',
    };

    const fetchOptions: FetchOptions = {
        ...options,
        headers,
        credentials: 'include',
    };

    return fetch(url, fetchOptions);
};