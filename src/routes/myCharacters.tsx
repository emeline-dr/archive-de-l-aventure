import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import { MyCharactersComponent } from '../pages/myCharactersPage';

export const myCharactersRoute = createRoute({
    path: '/myCharacters',
    getParentRoute: () => RootRoute,
    component: MyCharactersComponent,
    beforeLoad: () => {
        requireAuth();
    },
});