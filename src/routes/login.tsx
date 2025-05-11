import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

export const loginRoute = createRoute({
    path: '/login',
    getParentRoute: () => RootRoute,
    component: () => <h1>Se connecter</h1>,
});
