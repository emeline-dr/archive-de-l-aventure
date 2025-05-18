import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';

import { useSheets } from '../api/sheetApi';

import Sidebar from "../components/sidebar"
import BackgroundIcon from '../components/backgroundIcon';
import HeaderSheet from '../components/sheetComponent/headerSheet';
import AbilitiesSheet from '../components/sheetComponent/abilitiesSheet';
import HealthSheet from '../components/sheetComponent/healthSheet';
import OthersCharactericticsSheet from '../components/sheetComponent/OthersCharactericticsSheet';
import SkillsSheet from '../components/sheetComponent/skillsSheet';
import SavingThrowSheet from '../components/sheetComponent/savingThrowSheet';
import ProficienciesSheet from '../components/sheetComponent/proficienciesSheet';

import AppLoreCaracRelationsSheet from '../components/sheetComponent/appLoreCaracRelationsSheet';

export function CharactersOwnedPage() {
    const { sheetId } = useParams({ from: '/myCharacters/$sheetId' });
    const { data, isLoading } = useSheets(Number(sheetId));


    const [shared, setShared] = useState(false);

    if (isLoading) return <div>Chargement…</div>;

    if (!data) return <div>Fiche non trouvée</div>;
    const { sheet, abilities } = data;

    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>

            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className='flex flex-wrap start gap-y-[8px]'>
                    <div className="breadcrumb pe-[16px] underline text-accent">
                        <Link to="/myCharacters">Mes aventuriers</Link>
                    </div>
                    <div className="breadcrumb text-background">Fiche de {sheet.firstname ? sheet.firstname : 'Arlahne'} {sheet.lastname ? sheet.lastname : ''}</div>
                </div>

                <div className="flex flex-wrap justify-between my-[40px]">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline'>Fiche de {sheet.firstname ? sheet.firstname : 'Arlahne'} {sheet.lastname ? sheet.lastname : ''}</h2>

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
                        system_id={sheet.system_id}
                        sheet_id={sheet.id}
                        avatar={sheet.avatar_src}
                        firstname={sheet.firstname}
                        lastname={sheet.lastname}
                    />

                    <div className='flex flex-wrap w-full justify-between gap-y-[40px]'>
                        <AbilitiesSheet
                            system_id={sheet.system_id}
                            sheet_id={sheet.id}
                            abilities={abilities}
                        />

                        <HealthSheet
                            system_id={sheet.system_id}
                            sheet_id={sheet.id}
                        />
                    </div>

                    <div className="flex flex-wrap w-full justify-center gap-[40px]">
                        {sheet.system_id === 2 && <OthersCharactericticsSheet
                            sheet_id={sheet.id}
                        />}
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        <SkillsSheet
                            sheet_id={sheet.id}
                            system_id={sheet.system_id}
                        />

                        {sheet.system_id === 2 &&
                            <SavingThrowSheet />
                        }
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        {sheet.system_id === 2 &&
                            <ProficienciesSheet
                                sheet_id={sheet.id}
                            />
                        }
                    </div>


                    {sheet.system_id === 2 &&
                        <AppLoreCaracRelationsSheet
                            sheet_id={sheet.id}
                        />}
                </div>
            </div>

            <BackgroundIcon></BackgroundIcon>
        </div>
    )
}