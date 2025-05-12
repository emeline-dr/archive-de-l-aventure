import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { Link } from '@tanstack/react-router';

import banner from '../assets/images/banner.jpg';
import logoHome from '../assets/images/logo-home.png';
import indexBanner from '../assets/images/index-banner.jpg';

export const homeRoute = createRoute({
    path: '/',
    getParentRoute: () => RootRoute,
    component: () =>
        <>
            <img src={banner} alt="" className='h-screen w-full object-cover' />
            <div className='absolute top-0 left-0 h-screen w-full bg-text-75'>
                <div className='w-full mt-[80px]'>
                    <img src={logoHome} alt="" className='h-[135px] object-cover mix-blend-hard-light mx-auto' />
                    <h1 className='relative z-1 w-fit mt-[-100px] mx-auto rounded-xs bg-accent-85 px-[24px] py-[16px] font-uncial-antiqua text-4xl tracking-[10%] text-center'>
                        Les Archives de l'Aventure
                    </h1>
                </div>
                <div className='w-full lg:w-1/2 flex flex-wrap flex-col content-center justify-center mt-[64px]'>
                    <p className='w-2/3 text-background text-xl'>
                        <span className='block font-uncial-antiqua text-2xl tracking-[12%] mb-[24px]'>
                            Un seul outil. Tous vos mondes.
                        </span>
                        Créez, gérez et incarnez vos personnages, quel que soit l’univers.
                        <br />
                        Du médiéval aux galaxies lointaines — vos aventures commencent ici.
                    </p>
                    <Link to="/signIn" className='h-fit relative z-1 mt-[40px] mx-auto'>
                        <button className='btn btn-accent'>
                            Rejoignez-nous !
                        </button>
                    </Link>
                </div>
                <div className='linear-home absolute z-0 bottom-0 left-0 h-[200px] w-full'></div>
            </div>
            <div className='w-full flex flex-wrap'>
                <div className="flex flex-wrap justify-center content-center h-screen w-full lg:w-1/2">
                    <div className='h-[600px] w-[500px] p-[16px] bg-[#E9E9E9] rounded-[20px]'>
                        <div className='scotch rotate-6'></div>
                        <img src={indexBanner} alt="" className='h-[500px] object-cover rounded-2xl' />
                        <p className='font-vampiro-one text-3xl text-center'>
                            No plus bels avan turs
                            <br />
                            (un barbare illéttré)
                        </p>
                        <div className='scotch -rotate-7'></div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center content-center h-screen w-full lg:w-1/2">
                    <p className='w-3/4 text-lg'>
                        Que vous descendiez dans un donjon infesté de gobelins, arpentiez les ruelles d'une mégalopole cybernétique, ou fuyiez une entité ancienne à bord d’un vaisseau en perdition… vos personnages ont besoin d’un refuge fiable.
                        <br /><br />
                        Ici, ils trouvent bien plus qu’une simple fiche : un bastion numérique pour suivre leur évolution, noter leurs exploits, et préparer leurs prochaines aventures.
                        <br /><br />
                        Créez, gérez et personnalisez vos fiches de personnage pour tous vos univers de jeu de rôle. Système médiéval-fantastique, science-fiction, horreur, post-apo ou univers maison — tout est possible.
                    </p>
                    <div className="diceBg flex flex-wrap content-center w-2/3 mt-[32px]">
                        <span className='block h-fit w-full p-[8px] rounded-[3px] bg-background-75 font-uncial-antiqua text-2xl text-center'>
                            Votre imagination est sans limites.
                            <br /><br />
                            Vos points de vie, un peu moins.
                        </span>
                    </div>
                </div>
            </div>
        </>
});
