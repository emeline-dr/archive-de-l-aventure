import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { CharactersOwnedPage } from '../pages/charactersOwnedPage';

export const CharactersOwnedRoute = createRoute({
    path: '/myCharacters/$sheetId',
    getParentRoute: () => RootRoute,
    component: CharactersOwnedPage,
});
