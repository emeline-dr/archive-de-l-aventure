import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import Sidebar from "../components/sidebar"

export function CharactersOwnedPage() {
    /* const arlahneSheet =
    {
        firstname: 'arlhane',
        lastname: null
    } */

    const [shared, setShared] = useState(false);


    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>

            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className='flex flex-wrap start gap-y-[8px]'>
                    <div className="breadcrumb pe-[16px] underline text-accent">
                        <Link to="/myCharacters">Mes aventuriers</Link>
                    </div>
                    <div className="breadcrumb text-background">Fiche de Arlahne</div>
                </div>

                <div className="flex flex-wrap justify-between my-[40px]">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline'>Fiche de Arlahne</h2>

                    <div className='flex flex-wrap gap-[16px]'>
                        <button
                            className='btn btn-text flex-1'
                            onClick={() => setShared(!shared)}
                        >
                            {shared === true &&
                                <><i className="fa-solid fa-square-check text-lg"></i> Partagée</>
                            }
                            {shared === false &&
                                <><i className="fa-solid fa-square text-lg"></i> Pas partagée</>
                            }
                        </button>

                        <Link to="/myCharacters/1/updateSheet">
                            <button className="btn btn-text flex-1">Modifier la fiche</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}