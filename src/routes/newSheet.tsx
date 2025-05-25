import { createRoute, Link } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import { requireAuth } from '../utils/authGuard';

import Sidebar from '../components/sidebar';
import BackgroundIcon from '../components/backgroundIcon';
import { NewSheetPage } from '../pages/newSheetPage';

export const NewSheetRoute = createRoute({
    path: '/myCharacters/newSheet',
    getParentRoute: () => RootRoute,
    beforeLoad: () => {
        requireAuth();
    },
    component: () =>
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>
            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className='flex flex-wrap start gap-y-[8px]'>
                    <div className="breadcrumb pe-[16px] underline text-accent">
                        <Link to="/myCharacters">Mes aventuriers</Link>
                    </div>
                    <div className="breadcrumb text-background">Nouvelle fiche</div>
                </div>
                <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px] leading-none'>Création d'une nouvelle fiche</h2>

                <NewSheetPage></NewSheetPage>

            </div>

            <BackgroundIcon></BackgroundIcon>
        </div>
});