import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

export const OthersCharactersRoute = createRoute({
    path: '/registers/1',
    getParentRoute: () => RootRoute,
    component: () => <h2>Les fiches aux autres</h2>,
});
