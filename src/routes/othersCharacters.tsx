import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import { OthersCharactersPage } from '../pages/othersCharactersPage';

export const OthersCharactersRoute = createRoute({
    path: '/registers/$sheetId',
    getParentRoute: () => RootRoute,
    component: OthersCharactersPage,
    beforeLoad: () => {
        requireAuth();
    },
});
