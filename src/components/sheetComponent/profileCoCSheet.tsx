type ProfileCoCSheetProps = {
    personal_desc: string;
    traits: string;
    believes: string;
    meaningful_location: string;
    treasured_possession: string;
    injuries_scar: string;
    phobia_mania: string;
    tomes_spells_artifacts: string;
    encounters: string;
    assets: string;
    notes: string;
}

export default function ProfileCoCSheet(props: ProfileCoCSheetProps) {
    return (
        <div className="w-full flex flex-wrap justify-between gap-[40px]">
            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Description</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.personal_desc}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Traits</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.traits}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Idéologie et croyance</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.believes}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Lieux importants</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.meaningful_location}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Biens précieux</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.treasured_possession}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Séquelles et cicatrices</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.injuries_scar}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Phobies et manies</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.phobia_mania}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Ouvrages occultes, sorts et artefacts</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.tomes_spells_artifacts}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Rencontres avec des entités étranges</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.encounters}
                </div>
            </div>

            <div className="w-full lg:w-3/7">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Possession</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.assets}
                </div>
            </div>

            <div className="w-full">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Notes</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {props.notes}
                </div>
            </div>
        </div>
    )
}