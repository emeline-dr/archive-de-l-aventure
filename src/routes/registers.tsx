import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import Sidebar from '../components/sidebar';

export const registersRoute = createRoute({
    path: '/registers',
    getParentRoute: () => RootRoute,
    component: () => <div className='indexBlock flex flex-wrap h-[200vh]'>
        <Sidebar></Sidebar>
        <div className='mx-[80px] my-[40px]'>
            <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline'>Les registres</h2>
        </div>
    </div>
});