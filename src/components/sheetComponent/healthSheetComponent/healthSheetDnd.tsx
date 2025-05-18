import { useAbilitiesDnD } from "../../../api/DnD/abilitiesDnDApi";

type HealthSheetDnDProps = {
    sheet_id: number;
    hit_dice: string;
    max_hp: number;
    hp: number;
}

export default function HealthSheetDnD(props: HealthSheetDnDProps) {
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

    const abilitiesMap = useAbilitiesDnD()

    if (abilitiesMap.isLoading) return <p>Chargement en cours...</p>
    if (abilitiesMap.error) return <p>Erreur.</p>
    if (!abilitiesMap.data) return null

    return (
        <>
            {abilitiesMap.data.map((ability) => {
                const localData = fakeAbilityData
                    .find(data => data.abilityId === ability.id && data.sheet_id === props.sheet_id && data.abilityId === 10);

                if (!localData) return null;

                const perception = (localData.modifier + 10);
                return (<div className="w-full flex flex-wrap flex-col justify-between border-b-1 border-b-background text-2xl text-center font-uncial-antiqua">
                    Perception
                    <span className="w-full font-crimson-text text-base">(perception passive)</span>
                    <span className="text-[32px]">{perception}</span>
                </div>
                )
            })}

            <div className="flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background text-2xl text-center font-uncial-antiqua">
                Max P.V.
                <span className="text-[32px]">{props.max_hp}</span>
            </div>

            <div className="flex-1 flex flex-wrap flex-col justify-between text-2xl text-center font-uncial-antiqua">
                P.V.
                <span className="text-[32px]">{props.hp}</span>
            </div>

            <div className="w-full flex flex-wrap pt-[8px] justify-between border-t-1 border-t-background text-2xl text-center font-uncial-antiqua">
                Dés de vie
                <span className="text-[32px]">{props.hit_dice}</span>
            </div>
        </>
    )
}