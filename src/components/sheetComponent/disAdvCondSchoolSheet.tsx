type DisAdvCondSchoolSheetProps = {
    disadv: string;
    adv: string;
    conditions: string;
    school_abilities: string;
}

export default function DisAdvCondSchoolSheet(props: DisAdvCondSchoolSheetProps) {
    return (
        <>
            <div className="w-full flex flex-wrap mt-[80px] gap-[40px]">
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Avantages</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.adv}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Désavantages</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.disadv}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap mt-[40px] gap-[40px]">
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">État(s)</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.conditions}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Capacité(s) d'école</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.school_abilities}
                    </div>
                </div>
            </div>
        </>
    )
}