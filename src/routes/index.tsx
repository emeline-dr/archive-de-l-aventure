import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import Sidebar from '../components/sidebar';

export const indexRoute = createRoute({
    path: '/index',
    getParentRoute: () => RootRoute,
    component: () => <div className='flex flex-wrap h-[200vh]'>
        <Sidebar></Sidebar>
        <div className='flex-1 mx-[80px] my-[40px]'>
            <div className="flex justify-end">
                <button className="btn btn-text">Créer un nouvel aventurier</button>
            </div>
            <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Mes derniers ajouts</h2>
            <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Mes favoris</h2>
        </div>
    </div>
});