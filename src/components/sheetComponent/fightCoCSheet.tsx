type FightCoCSheetProps = {
    damage_bonus: number;
    build: number;
    dodge: number;
}

export default function FightCoCSheet(props: FightCoCSheetProps) {
    return (
        <div className="flex flex-wrap justify-between gap-[40px] my-[40px] rounded-[3px]">
            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px]">
                Impact
                <span className="font-uncial-antiqua text-2xl">{props.damage_bonus}</span>
            </div>

            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px]">
                Carrure
                <span className="font-uncial-antiqua text-2xl">{props.build}</span>
            </div>

            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px]">
                Esquive
                <span className="font-uncial-antiqua text-2xl">{props.dodge}</span>
            </div>
        </div>
    )
}