type SanitySheetProps = {
    sanity: number;
    temp_insane: number;
    indef_insane: number;
}

export default function SanitySheet(props: SanitySheetProps) {
    return (
        <>
            <h3 className="w-full block text-2xl font-uncial-antiqua my-[40px] underline">Santé mentale et folie</h3>
            <div className="w-full flex flex-wrap justify-between font-uncial-antiqua p-[16px] bg-primary mb-[40px] rounded-[3px]">
                <div className="flex-1 text-xl">
                    Folie temporaire
                    <span className="text-[32px] ms-[16px]">{props.temp_insane}</span>
                </div>

                <div className="flex-1 text-xl">
                    Folie persistante
                    <span className="text-[32px] ms-[16px]">{props.indef_insane}</span>
                </div>

                <span className="w-full text-xl mt-[32px]">Santé mentale <span className="font-crimson-text text-sm">({props.sanity} / 100)</span></span>
                <div className="relative w-full bg-text rounded-full h-[8px] mt-[16px]">
                    <div
                        style={{ width: `${props.sanity}%` }}
                        className="absolute bg-accent rounded-full h-[8px]"
                    ></div>
                </div>
            </div>
        </>
    )
}