import Cookies from 'js-cookie';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export const fetchWithAuth = async (url: string, options: FetchOptions = {}): Promise<Response> => {
    const token = Cookies.get('jwt');

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