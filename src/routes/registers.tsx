import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';


export const registersRoute = createRoute({
    path: '/registers',
    getParentRoute: () => RootRoute,
    component: () => <h2>Les registres</h2>
});