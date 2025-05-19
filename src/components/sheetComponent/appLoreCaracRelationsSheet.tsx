type AppLoreCaracRelationsSheetProps = {
    apparence: string;
    histoire: string;
    caractere: string;
    allies: string;
    enemies: string;
}

export default function AppLoreCaracRelationsSheet(props: AppLoreCaracRelationsSheetProps) {
    return (
        <div className="w-full flex flex-wrap justify-between gap-[40px]">
            <div className="w-full">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Apparence</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.apparence}
                </div>
            </div>
            <div className="w-full">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Histoire</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.histoire}
                </div>
            </div>
            <div className="w-full">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Traits de caractère</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.caractere}
                </div>
            </div>
            <div className="w-full flex flex-wrap gap-[16px]">
                <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Relations</h3>
                <div className="flex-1 bg-primary p-[16px] text-base rounded-[3px]">
                    <h4 className="text-xl font-uncial-antiqua">Alliés</h4><br />
                    {props.allies}
                </div>
                <div className="flex-1 bg-primary p-[16px] text-base rounded-[3px]">
                    <h4 className="text-xl font-uncial-antiqua">Ennemis</h4><br />
                    {props.enemies}
                </div>
            </div>
        </div>
    )
}