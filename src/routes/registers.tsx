import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { RegistersPage } from '../pages/registersPage';

export const registersRoute = createRoute({
    path: '/registers',
    getParentRoute: () => RootRoute,
    component: RegistersPage
});