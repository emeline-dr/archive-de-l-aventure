import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import CommentsSheetPage from '../pages/commentsSheetPage';

export const CommentsSheetRoute = createRoute({
    path: '/registers/$sheetId/comments',
    getParentRoute: () => RootRoute,
    component: CommentsSheetPage,
});
