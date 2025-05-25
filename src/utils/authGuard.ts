import { redirect } from '@tanstack/react-router';
import Cookies from 'js-cookie';

export const requireAuth = () => {
    const token = Cookies.get('authToken');

    if (!token) {
        Cookies.remove('authToken');
        throw redirect({
            to: '/login'
        });
    }
};
