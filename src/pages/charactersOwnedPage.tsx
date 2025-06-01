import { Link } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import type { Sheet } from '../api/sheetApi';
import { useSheets, updateShared } from '../api/sheetApi';

import Sidebar from "../components/sidebar"
import BackgroundIcon from "../components/backgroundIcon"
import { OllamaChatModal } from '../components/ollama/ollamaChatModal';

import HeaderSheet from "../components/sheetComponent/headerSheet";
import AbilitiesSheet from "../components/sheetComponent/abilitiesSheet";
import HealthSheet from "../components/sheetComponent/healthSheet";
import DisAdvCondSchoolSheet from '../components/sheetComponent/disAdvCondSchoolSheet';
import OthersCharactericticsSheet from "../components/sheetComponent/OthersCharactericticsSheet";
import SanitySheet from "../components/sheetComponent/sanitySheet";
import FightCoCSheet from "../components/sheetComponent/fightCoCSheet";
import SkillsSheet from "../components/sheetComponent/skillsSheet";
import SavingThrowSheet from "../components/sheetComponent/savingThrowSheet";
import ProficienciesSheet from "../components/sheetComponent/proficienciesSheet";
import FeatSheet from "../components/sheetComponent/featSheet";
import WeaponsSheet from "../components/sheetComponent/weaponsSheet";
import ItemsSheet from "../components/sheetComponent/itemsSheet";
import SpellsSheet from "../components/sheetComponent/spellsSheet";
import TechniquesSchoolNotesSheet from '../components/sheetComponent/techniquesSchoolNotesSheet';
import AppLoreCaracRelationsSheet from "../components/sheetComponent/appLoreCaracRelationsSheet";
import ProfileCoCSheet from "../components/sheetComponent/profileCoCSheet";
import FellowInvestigatorsSheet from "../components/sheetComponent/fellowInvestigatorsSheet";

export function CharactersOwnedPage() {
    const { sheetId } = useParams({ from: '/myCharacters/$sheetId' });
    const { data, isLoading } = useSheets(Number(sheetId));
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ sheet }: { sheet: Sheet }) => updateShared(sheet, Number(sheetId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sheets-per-user', Number(sheetId)] });
        },
    });

    if (isLoading || !data) return <div>Chargement...</div>;

    const { sheet, details, weapons, feat, items, abilities, saving_throw, spells, spells_slot, fellowInvestigators } = data;

    const handleToggleShared = () => {
        mutate({ sheet: { ...sheet, shared: !sheet.shared } });
    };
    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>

            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] mt-[40px] mb-[80px]'>
                <div className='flex flex-wrap start gap-y-[8px]'>
                    <div className="breadcrumb pe-[16px] underline text-accent">
                        <Link to="/myCharacters">Mes aventuriers</Link>
                    </div>
                    <div className="breadcrumb text-background">Fiche de {sheet.firstname} {sheet.lastname ? sheet.lastname : ''}</div>
                </div>

                <div className="flex flex-wrap justify-between mt-[40px]">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline mb-[40px]'>{sheet.firstname ? sheet.firstname : 'Arlahne'} {sheet.lastname ? sheet.lastname : ''}</h2>

                    <div className='flex flex-wrap gap-[16px] mb-[40px]'>
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
                        lastname={sheet.lastname ?? ''}
                    />

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
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

                    <div className="flex flex-wrap w-full justify-center">
                        {sheet.system_id === 1 &&
                            <DisAdvCondSchoolSheet
                                disadv={details.disadv || ''}
                                adv={details.adv || ''}
                                adversities={details.adversities || ''}
                                roles={details.roles || ''}
                                conditions={details.conditions || ''}
                                school_abilities={details.school_abilities || ''}
                                ninjo={details.ninjo || ''}
                                giri={details.giri || ''}
                                personality_habits_quirks={details.personality_habits_quirks || ''}
                            />
                        }

                        {sheet.system_id === 2 &&
                            <OthersCharactericticsSheet
                                proficiency={details.proficiency ?? 0}
                                ca={details.ca ?? 0}
                                initiative={details.initiative ?? 0}
                                speed={details.speed ?? 0}
                                swim_speed={details.swim_speed ?? 0}
                                climb_speed={details.climb_speed ?? 0}
                                fly_speed={details.fly_speed ?? 0}
                                inspiration={details.inspiration || false}
                            />
                        }

                        {sheet.system_id === 3 &&
                            <>
                                <FightCoCSheet
                                    damage_bonus={details.damage_bonus ?? 0}
                                    build={details.build ?? 0}
                                    dodge={details.dodge ?? 0}
                                />

                                <SanitySheet
                                    sanity={details.sanity ?? 99}
                                    temp_insane={details.temp_insane ?? 0}
                                    indef_insane={details.indef_insane ?? 0}
                                />
                            </>
                        }
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        <SkillsSheet
                            sheet_id={sheet.id}
                            system_id={sheet.system_id}
                        />

                        {sheet.system_id === 2 &&
                            <SavingThrowSheet
                                savingThrows={saving_throw}
                                success={details.death_saves_success ?? 0}
                                failed={details.death_saves_fail ?? 0}
                            />
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
                            system_id={sheet.system_id}
                            weapons={weapons}
                        />
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        {sheet.system_id === 1 &&
                            <ItemsSheet
                                system_id={sheet.system_id}
                                koku={details.koku ?? 0}
                                zeni={details.zeni ?? 0}
                                bu={details.bu ?? 0}
                                items={items}
                            />
                        }

                        {sheet.system_id === 2 &&
                            <ItemsSheet
                                system_id={sheet.system_id}
                                copper={details.copper ?? 0}
                                silver={details.silver ?? 0}
                                electrum={details.electrum ?? 0}
                                gold={details.gold ?? 0}
                                platinum={details.platinum ?? 0}
                                items={items}
                            />
                        }

                        {sheet.system_id === 3 &&
                            <ItemsSheet
                                system_id={sheet.system_id}
                                cash={details.cash}
                                spending_lvl={details.spending_lvl}
                                items={items}
                            />
                        }
                    </div>

                    <div className='flex flex-wrap w-full justify-between gap-[40px]'>
                        {sheet.system_id == 2 &&
                            <SpellsSheet
                                spells={spells}
                                spells_slots={spells_slot}
                                dd_spell={details.dd_spell ?? 0}
                                spell_bonus_attack={details.spell_bonus_attack ?? 0}
                            />
                        }
                    </div>

                    {sheet.system_id === 1 &&
                        <TechniquesSchoolNotesSheet
                            distinctions={details.distinctions ?? ''}
                            passions={details.passions ?? ''}
                            anxieties={details.anxieties ?? ''}
                            new_actions={details.techniques_new_actions ?? ''}
                            new_flower={details.techniques_new_flower ?? ''}
                            notes={details.notes ?? ''}
                        />
                    }

                    {sheet.system_id === 2 &&
                        <AppLoreCaracRelationsSheet
                            apparence={details.apparence || ''}
                            histoire={details.histoire || ''}
                            caractere={details.caractere || ''}
                            allies={details.allies || ''}
                            enemies={details.enemies || ''}
                        />}

                    {sheet.system_id === 3 && fellowInvestigators &&
                        <>
                            <FellowInvestigatorsSheet
                                fellow_investigators={fellowInvestigators}
                            />

                            <ProfileCoCSheet
                                personal_desc={details.personal_desc || ''}
                                traits={details.traits || ''}
                                believes={details.believes || ''}
                                meaningful_location={details.meaningful_location || ''}
                                treasured_possession={details.treasured_possession || ''}
                                injuries_scar={details.injurie_scar || ''}
                                phobia_mania={details.phobia_mania || ''}
                                tomes_spells_artifacts={details.tomes_spell_artifacts || ''}
                                encounters={details.encounters || ''}
                                assets={details.assets || ''}
                                notes={details.notes || ''}
                            />
                        </>
                    }
                </div>
            </div>

            <OllamaChatModal />
            <BackgroundIcon></BackgroundIcon>
        </div>
    )
}