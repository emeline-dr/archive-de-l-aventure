import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

export const UpdateSheetRoute = createRoute({
    path: '/myCharacters/$sheetId/updateSheet',
    getParentRoute: () => RootRoute,
    component: () => <h2>Ici, on modifie sa fiche</h2>,
    beforeLoad: () => {
        requireAuth();
    },
});
