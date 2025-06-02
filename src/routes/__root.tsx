import { Outlet } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';

import Navbar from '../components/navbar';

export const Route = createRootRoute({
    component: () => (
        <div className='leading-[140%] bg-background text-text font-crimson-text'>
            <Navbar />
            <Outlet />
        </div>
    ),
    notFoundComponent: () =>
        <div className='pageContenant notFoundBg'>
            <div className='notFoundImg relative flex flex-wrap justify-center content-center h-full bg-cover bg-center'>
                <div className="notFoundGradient h-full w-full absolute top-0 start-0"></div>
                <div className="z-1 w-3/4 md:w-1/2 xl:w-1/3 flex flex-col justify-between gap-[40px]">
                    <div className='text-background text-center w-full bg-text rounded-sm p-[16px]'>
                        <h2 className='font-uncial-antiqua text-2xl'>
                            <i className='text-accent'>Oups !</i><br />
                            La quête a pris un mauvais tournant…
                        </h2>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-accent">
                        Retour à la page précédente
                    </button>
                </div>
            </div>
        </div>,
});
