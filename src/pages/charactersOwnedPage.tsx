import { Link } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useSheets } from '../api/sheetApi';
import { updateShared } from '../api/sheetApi';

import Sidebar from "../components/sidebar"
import BackgroundIcon from '../components/backgroundIcon';
import HeaderSheet from '../components/sheetComponent/headerSheet';
import AbilitiesSheet from '../components/sheetComponent/abilitiesSheet';
import HealthSheet from '../components/sheetComponent/healthSheet';
import OthersCharactericticsSheet from '../components/sheetComponent/OthersCharactericticsSheet';
import SkillsSheet from '../components/sheetComponent/skillsSheet';
import SavingThrowSheet from '../components/sheetComponent/savingThrowSheet';
import ProficienciesSheet from '../components/sheetComponent/proficienciesSheet';
import WeaponsSheet from '../components/sheetComponent/weaponsSheet';
import ItemsSheet from '../components/sheetComponent/itemsSheet';
import FeatSheet from '../components/sheetComponent/featSheet';
import SpellsSheet from '../components/sheetComponent/spellsSheet';

import AppLoreCaracRelationsSheet from '../components/sheetComponent/appLoreCaracRelationsSheet';

export function CharactersOwnedPage() {
    const { sheetId } = useParams({ from: '/myCharacters/$sheetId' });
    const { data, isLoading } = useSheets(Number(sheetId));
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (shared: boolean) => updateShared(Number(sheetId), shared),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sheets-per-user', Number(sheetId)] });
        },
    });

    if (isLoading || !data) return <div>Chargement...</div>;

    const handleToggleShared = () => {
        mutate(!data.sheet.shared);
    };

    const { sheet, details, weapon, feat, item, abilities, spells, spells_slot } = data;

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

                <div className="flex flex-wrap justify-between mt-[40px]">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline mb-[40px]'>Fiche de {sheet.firstname ? sheet.firstname : 'Arlahne'} {sheet.lastname ? sheet.lastname : ''}</h2>

                    <div className='flex flex-wrap gap-[16px]  mb-[40px]'>
                        <button
                            className='btn btn-text flex-1'
                            onClick={handleToggleShared} disabled={isPending}
                        >
                            {sheet.shared === true &&
                                <><i className="fa-solid fa-square-check text-lg"></i> Partagée</>
                            }
                            {sheet.shared === false &&
                                <><i className="fa-solid fa-square text-lg"></i> Pas partagée</>
                            }
                        </button>

                        <Link to={`/myCharacters/${sheet.id}/updateSheet`}>
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
                            proficiency={details.proficiency ?? 0}
                            ca={details.ca ?? 0}
                            initiative={details.speed ?? 0}
                            speed={details.speed ?? 0}
                            swim_speed={details.swim_speed ?? 0}
                            climb_speed={details.climb_speed ?? 0}
                            fly_speed={details.fly_speed ?? 0}
                            inspiration={details.inspiration || false}
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
                            <>
                                <ProficienciesSheet
                                    armor_prof={details.armor_prof || ''}
                                    weapon_prof={details.weapon_prof || ''}
                                    tools_prof={details.tools_prof || ''}
                                />

                                <FeatSheet
                                    feats={feat}
                                />
                            </>
                        }
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        <WeaponsSheet
                            weapons={weapon}
                        />
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        <ItemsSheet
                            copper={details.copper ?? 0}
                            silver={details.silver ?? 0}
                            electrum={details.electrum ?? 0}
                            gold={details.gold ?? 0}
                            platinum={details.platinum ?? 0}
                            items={item}
                        />
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        <SpellsSheet
                            spells={spells}
                            spells_slots={spells_slot}
                            dd_spell={details.dd_spell ?? 0}
                            spell_bonus_attack={details.spell_bonus_attack ?? 0}
                        />
                    </div>

                    {sheet.system_id === 2 &&
                        <AppLoreCaracRelationsSheet
                            apparence={details.apparence || ''}
                            histoire={details.histoire || ''}
                            caractere={details.caractere || ''}
                            allies={details.allies || ''}
                            enemies={details.enemies || ''}
                        />}
                </div>
            </div>

            <BackgroundIcon></BackgroundIcon>
        </div>
    )
}