import { Link } from "@tanstack/react-router";

import type { FellowInvestigators } from "../../api/sheetApi"

type FellowInvestigatorsSheetProps = {
    fellow_investigators: FellowInvestigators[];
}

export default function FellowInvestigatorsSheet(props: FellowInvestigatorsSheetProps) {
    const { fellow_investigators } = props;

    if (!fellow_investigators || fellow_investigators.length === 0) return <p>Aucun ami investigateur disponible.</p>;

    return (
        <>
            <h3 className="block w-full flex flex-wrap justify-between gap-[40px] text-2xl font-uncial-antiqua mt-[40px] underline">Amis investigateurs</h3>
            {fellow_investigators.map((friend) => {
                return (
                    <div className="flex-1 rounded-sm bg-primary mt-[40px] px-[8px] py-[16px]">
                        <Link to={`/registers/${friend.sheet_id}`}
                            className="font-uncial-antiqua text-base">
                            {friend.character}
                        </Link> joué par {friend.player}
                    </div>
                )
            })}
        </>
    )
}