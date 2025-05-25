type ProficienciesSheetProps = {
    weapon_prof: string;
    armor_prof: string;
    tools_prof: string;
}

export default function ProficienciesSheet(props: ProficienciesSheetProps) {
    return (
        <div className="flex-1 flex flex-wrap justify-between rounded-[3px]">
            <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Maîtrises</h3>
            <div className="w-full bg-primary py-[16px] px-[8px] rounded-[3px]">
                <span className="block w-full text-cl font-uncial-antiqua pb-[8px]">Armes</span>
                {props.weapon_prof}
            </div>

            <div className="w-full bg-primary py-[16px] px-[8px] my-[8px] rounded-[3px]">
                <span className="block w-full text-cl font-uncial-antiqua pb-[8px]">Armures</span>
                {props.armor_prof}
            </div>

            <div className="w-full bg-primary py-[16px] px-[8px] rounded-[3px]">
                <span className="block w-full text-cl font-uncial-antiqua pb-[8px]">Outils</span>
                {props.tools_prof}
            </div>
        </div>
    )
}