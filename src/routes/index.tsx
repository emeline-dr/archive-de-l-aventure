import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

import Sidebar from '../components/sidebar';
import SheetSnippet from '../components/sheetSnippet';
import BackgroundIcon from '../components/backgroundIcon';

import avatarOne from '../assets/images/icons-avatar-1.jpg';
import avatarTwo from '../assets/images/icons-avatar-3.jpg';
import avatarThree from '../assets/images/icons-avatar-2.jpg';

import avatarSix from '../assets/images/icons-avatar-6.jpg';
import avatarEight from '../assets/images/icons-avatar-8.jpg';
import avatarTen from '../assets/images/icons-avatar-10.jpg';

import DnD from "../assets/images/bg-dnd.png";
import CoC from "../assets/images/bg-cthulhu.jpg";
import L5R from "../assets/images/bg-lcinqa.webp";

export const indexRoute = createRoute({
    path: '/index',
    getParentRoute: () => RootRoute,
    component: () => <div className='pageContenant flex flex-wrap h-full'>
        <Sidebar></Sidebar>
        <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
            <div className="flex justify-end">
                <button className="btn btn-text">Créer un nouvel aventurier</button>
            </div>
            <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Mes derniers ajouts</h2>
            <div className='flex flex-wrap justify-between gap-y-4'>
                <SheetSnippet authorId={1} myId={1} authorName='Ryune' isLiked={false} name="Arlahne" img={avatarOne} info="Occultiste (Fiélon)" system={DnD} lvl="01"></SheetSnippet>
                <SheetSnippet authorId={1} myId={1} authorName='Ryune' isLiked={false} name="Naoe Fujiwara" img={avatarTwo} info="Licorne" system={L5R} lvl="04"></SheetSnippet>
                <SheetSnippet authorId={1} myId={1} authorName='Ryune' isLiked={false} name="Elaine Ann Cormier" img={avatarThree} info="Détective privé" system={CoC} lvl="05"></SheetSnippet>
            </div>
            <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Mes favoris</h2>
            <div className='flex flex-wrap justify-between gap-y-4'>
                <SheetSnippet authorId={2} myId={1} authorName='Marisha Ray' isLiked={true} name="Laudna" img={avatarSix} info="Ensorceleur (Magie des Ombres)" system={DnD} lvl="11"></SheetSnippet>
                <SheetSnippet authorId={3} myId={1} authorName="Lae'zel" isLiked={true} name="Shadowheart" img={avatarEight} info="Clerc (Lumière)" system={DnD} lvl="01"></SheetSnippet>
                <SheetSnippet authorId={4} myId={1} authorName="Taliesin Jaffe" isLiked={true} name="Percival de Rolo" img={avatarTen} info="Occultiste (Fiélon)" system={DnD} lvl="01"></SheetSnippet>
            </div>
        </div>

        <BackgroundIcon></BackgroundIcon>
    </div>
});