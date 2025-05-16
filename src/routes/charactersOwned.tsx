import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

export const CharactersOwnedRoute = createRoute({
    path: '/myCharacters/1',
    getParentRoute: () => RootRoute,
    component: () => <h2>Ses fiches à soi</h2>,
});
