import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import IndexPage from '../pages/indexPage';

export const indexRoute = createRoute({
    path: '/index',
    getParentRoute: () => RootRoute,
    component: IndexPage,
    beforeLoad: () => {
        requireAuth();
    },
});
