import { redirect } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { isJwtExpired } from './AuthUtils';

export const requireAuth = () => {
    const token = Cookies.get('authToken');

    if (!token || isJwtExpired(token)) {
        Cookies.remove('authToken');
        throw redirect({
            to: '/login',
            search: {
                redirectTo: window.location.pathname,
            },
        });
    }
};
