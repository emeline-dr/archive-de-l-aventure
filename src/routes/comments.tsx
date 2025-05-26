import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import CommentsComponent from '../pages/commentsPage';

export const CommentsSheetRoute = createRoute({
    path: '/registers/$sheetId/comments',
    getParentRoute: () => RootRoute,
    component: CommentsComponent,
    beforeLoad: () => {
        requireAuth();
    },
});