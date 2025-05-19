import type { Ability } from "../../../api/sheetApi"

type HealthSheetDnDProps = {
    sheet_id: number;
    abilities: Ability[];
    hit_dice: string;
    max_hp: number;
    hp: number;
}

export default function HealthSheetDnD(props: HealthSheetDnDProps) {
    const sagesseAbility = props.abilities.find((sagesse) => sagesse.id === 10);
    let perception = 0;

    if (!sagesseAbility) {
        perception = 0
    } else {
        perception = sagesseAbility.value + 10;
    }

    return (
        <>

            <div className="w-full flex flex-wrap flex-col justify-between border-b-1 border-b-background text-2xl text-center font-uncial-antiqua">
                Perception
                <span className="w-full font-crimson-text text-base">(perception passive)</span>
                <span className="text-[32px]">{perception}</span>
            </div>


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