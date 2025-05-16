import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import Sidebar from "../components/sidebar"
import HeaderSheet from '../components/sheetComponent/headerSheet';

import avatar from "../assets/images/icons-avatar-1.jpg"

export function CharactersOwnedPage() {
    const arlahneSheet =
    {
        system_id: 1,
        avatar: avatar,
        firstname: 'Arlhane',
        lastname: null,
        class: 'Occultiste',
        subclass: 'Fiélon',
        race: 'Demi-elfe',
        subrace: null,
        origin: 'Enfant des rues',
        alignement: 'Chaotique Bon',
        language: ['Commun', 'Elfique', 'Nain'],
        lvl: 1,
        exp: 0,
    }

    const [shared, setShared] = useState(false);

    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>

            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className='flex flex-wrap start gap-y-[8px]'>
                    <div className="breadcrumb pe-[16px] underline text-accent">
                        <Link to="/myCharacters">Mes aventuriers</Link>
                    </div>
                    <div className="breadcrumb text-background">Fiche de {arlahneSheet.firstname} {arlahneSheet.lastname ? arlahneSheet.lastname : ''}</div>
                </div>

                <div className="flex flex-wrap justify-between my-[40px]">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline'>Fiche de {arlahneSheet.firstname} {arlahneSheet.lastname ? arlahneSheet.lastname : ''}</h2>

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

                    <HeaderSheet
                        system_id={arlahneSheet.system_id}
                        avatar={arlahneSheet.avatar}
                        firstname={arlahneSheet.firstname}
                        lastname={arlahneSheet.lastname}
                        class={arlahneSheet.class}
                        subclass={arlahneSheet.subclass}
                        race={arlahneSheet.race}
                        subrace={arlahneSheet.subrace}
                        origin={arlahneSheet.origin}
                        alignement={arlahneSheet.alignement}
                        language={arlahneSheet.language}
                        lvl={arlahneSheet.lvl}
                        exp={arlahneSheet.exp}
                    />
                </div>
            </div>
        </div>
    )
}