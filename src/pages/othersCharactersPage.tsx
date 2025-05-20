import { Link, useParams } from "@tanstack/react-router"

import Sidebar from "../components/sidebar"
import BackgroundIcon from "../components/backgroundIcon"

import { useSheets } from '../api/sheetApi';

export function OthersCharactersPage() {
    const { sheetId } = useParams({ from: '/registers/$sheetId' });
    const { data, isLoading } = useSheets(Number(sheetId));

    if (isLoading || !data) return <div>Chargement...</div>;

    const { sheet } = data;

    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>

            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className='flex flex-wrap start gap-y-[8px]'>
                    <div className="breadcrumb pe-[16px] underline text-accent">
                        <Link to="/registers">Les registres</Link>
                    </div>
                    <div className="breadcrumb text-background">Fiche de {sheet.firstname} {sheet.lastname ? sheet.lastname : ''}</div>
                </div>
            </div>

            <BackgroundIcon></BackgroundIcon>
        </div>
    )
}