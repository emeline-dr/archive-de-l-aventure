import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { LoginForm } from '../pages/loginForm';

export const loginRoute = createRoute({
    path: '/login',
    getParentRoute: () => RootRoute,
    component: LoginForm,
});
