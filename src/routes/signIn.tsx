import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { RegisterForm } from '../components/registerForm';

export const signInRoute = createRoute({
    path: '/signIn',
    getParentRoute: () => RootRoute,
    component: RegisterForm,
});
