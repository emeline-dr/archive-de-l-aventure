import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import { CharactersOwnedPage } from '../pages/charactersOwnedPage';

export const CharactersOwnedRoute = createRoute({
    path: '/myCharacters/$sheetId',
    getParentRoute: () => RootRoute,
    component: CharactersOwnedPage,
    beforeLoad: () => {
        requireAuth();
    },
});
