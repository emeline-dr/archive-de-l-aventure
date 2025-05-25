import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import CommentsSheetPage from '../pages/commentsSheetPage';

export const CommentsSheetRoute = createRoute({
    path: '/registers/$sheetId/comments',
    getParentRoute: () => RootRoute,
    component: CommentsSheetPage,
    beforeLoad: () => {
        requireAuth();
    },
});