import { Outlet } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';

import Navbar from '../components/navbar';

export const Route = createRootRoute({
    component: () => (
        <div className='leading-[140%] bg-background text-text font-crimson-text'>
            <Navbar></Navbar>
            <Outlet />
        </div>
    ),
});
