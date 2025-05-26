type DisAdvCondSchoolSheetProps = {
    disadv: string;
    adv: string;
    adversities: string;
    roles: string;
    conditions: string;
    school_abilities: string;
    ninjo: string;
    giri: string;
    personality_habits_quirks: string;
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
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Adversités</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.adversities}
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
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Rôle(s)</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.roles}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Capacité(s) d'école</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.school_abilities}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap mt-[40px] gap-[40px]">
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Ninjo</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.ninjo}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="block text-2xl font-uncial-antiqua mb-[40px] underline">Giri</h3>
                    <div className="w-full bg-primary p-[8px] rounded-[3px]">
                        {props.giri}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap mt-[40px] gap-[40px]">
                <h3 className="block text-2xl font-uncial-antiqua underline">Personnalité, habitude(s) et manie(s)</h3>
                <div className="w-full bg-primary p-[8px] rounded-[3px]">
                    {props.personality_habits_quirks}
                </div>
            </div>
        </>
    )
}