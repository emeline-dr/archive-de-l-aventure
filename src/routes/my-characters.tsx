import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';


export const myCharactersRoute = createRoute({
    path: '/my-characters',
    getParentRoute: () => RootRoute,
    component: () => <h2>Mes aventuriers</h2>
});