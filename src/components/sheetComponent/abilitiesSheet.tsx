import { useAbilities } from "../../api/abilitiesApi";

import bgAbility from '../../assets/images/fondSheetCarac.png'

type AbilitiesSheetProps = {
    system_id: number;
    sheet_id: number;
};

function AbilitiesSheet(props: AbilitiesSheetProps) {
    const fakeAbilityData = [
        { abilityId: 8, value: 14, modifier: +2, sheet_id: 1 },
        { abilityId: 9, value: 12, modifier: +1, sheet_id: 1 },
        { abilityId: 11, value: 19, modifier: +4, sheet_id: 1 },
        { abilityId: 10, value: 13, modifier: +1, sheet_id: 1 },
        { abilityId: 6, value: 8, modifier: -1, sheet_id: 1 },
        { abilityId: 7, value: 14, modifier: +2, sheet_id: 1 },
        { abilityId: 1, value: 14, modifier: +2, sheet_id: 1 },
        { abilityId: 10, value: 1, modifier: +8, sheet_id: 2 },
    ];

    const abilitiesAll = useAbilities();

    if (abilitiesAll.isLoading) return <p>Chargement en cours...</p>
    if (abilitiesAll.error) return <p>Erreur.</p>
    if (!abilitiesAll.data) return null

    const abilitiesFiltered = abilitiesAll.data
        .filter((ability: { system_id: number }) => ability.system_id === props.system_id)
        .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

    if (abilitiesFiltered.length === 0) {
        return <p>Aucune aptitude disponible pour le système {props.system_id}.</p>;
    }

    return (
        <div className="flex flex-wrap justify-between gap-[8px] bg-primary px-[8px] py-[16px] rounded-[3px]">
            {abilitiesFiltered.map((ability, index) => {
                const localData = fakeAbilityData
                    .find(data => data.abilityId === ability.id && data.sheet_id === props.sheet_id);

                const isEvenIndex = index % 2 === 0;

                return (
                    <div className="h-[200px] w-[140px]">
                        <h3 className="font-uncial-antiqua text-[32px] truncate h-[35px] text-center leading-none">
                            {ability.label}
                        </h3>
                        <div className="h-[155px] w-[140px]" key={ability.id}
                            style={{
                                backgroundImage: `url(${bgAbility})`,
                                backgroundColor: 'var(--color-primary)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundBlendMode: 'overlay',
                                transform: isEvenIndex ? 'scaleX(-1)' : 'none',
                            }}>
                            <div className="h-full flex flex-wrap flex-col justify-between content-center font-uncial-antiqua"
                                style={{
                                    transform: isEvenIndex ? 'scaleX(-1)' : 'none',
                                    marginLeft: '16px',
                                }}>
                                <span className="text-[32px] pt-[48px]">
                                    {localData?.value}
                                </span>
                                <span className="text-2xl pb-[16px]">
                                    {localData ? (localData.modifier >= 0 ? `+${localData.modifier}` : localData.modifier) : '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default AbilitiesSheet;
