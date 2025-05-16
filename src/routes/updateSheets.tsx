import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

export const UpdateSheetRoute = createRoute({
    path: '/myCharacters/1/updateSheet',
    getParentRoute: () => RootRoute,
    component: () => <h2>Ici, on modifie sa fiche</h2>,
});
