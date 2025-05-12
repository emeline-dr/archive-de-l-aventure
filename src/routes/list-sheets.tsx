import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';


export const listSheetsRoute = createRoute({
    path: '/list-sheets',
    getParentRoute: () => RootRoute,
    component: () => <h2>Les registres</h2>
});