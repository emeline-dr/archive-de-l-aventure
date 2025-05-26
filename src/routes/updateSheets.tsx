import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import UpdateSheetPage from '../pages/updateSheetPage';

export const UpdateSheetRoute = createRoute({
    path: '/myCharacters/$sheetId/updateSheet',
    getParentRoute: () => RootRoute,
    component: UpdateSheetPage,
    beforeLoad: () => {
        requireAuth();
    },
});
