import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

export const registerRoute = createRoute({
    path: '/register',
    getParentRoute: () => RootRoute,
    component: () => <h1>S'inscrire</h1>,
});
