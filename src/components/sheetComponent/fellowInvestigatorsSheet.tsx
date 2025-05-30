import type { FellowInvestigators } from "../../api/sheetApi"

type FellowInvestigatorsSheetProps = {
    fellow_investigators: FellowInvestigators[];
}

export default function FellowInvestigatorsSheet(props: FellowInvestigatorsSheetProps) {
    const { fellow_investigators } = props;

    return (
        <>
            <h3 className="block w-full text-2xl font-uncial-antiqua my-[40px] underline">Amis investigateurs</h3>
            <div className="w-full flex flex-wrap justify-between gap-[40px] ">
                {fellow_investigators.length > 0 ? (
                    fellow_investigators.map((friend) => {
                        return (
                            <div className="flex-1 rounded-sm bg-primary px-[8px] py-[16px]">
                                <span className="font-uncial-antiqua me-[16px]">{friend.character}</span>joué par <i>{friend.player}</i>
                            </div>
                        )
                    })) : (
                    <div>Aucun ami investigateur.</div>
                )}
            </div>
        </>
    )
}