import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { RegisterForm } from '../components/registerForm';

export const registerRoute = createRoute({
    path: '/register',
    getParentRoute: () => RootRoute,
    component: RegisterForm,
});
