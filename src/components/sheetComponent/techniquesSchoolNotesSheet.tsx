type TechniquesSchoolNotesSheetProps = {
    new_flower: string;
    new_actions: string;
    notes: string;
}

export default function TechniquesSchoolNotesSheet(props: TechniquesSchoolNotesSheetProps) {

    return (
        <div className="w-full flex flex-wrap gap-[40px] mt-[40px]">
            <h3 className="block w-full text-2xl font-uncial-antiqua underline">Techniques</h3>
            <div className="flex-1 flex flex-wrap bg-primary rounded-[3px] p-[8px]">
                <h4 className="w-full font-uncial-antiqua text-xl">Nouvelles ֍</h4>
                <p>{props.new_flower}</p>
            </div>
            <div className="flex-1 flex flex-wrap bg-primary rounded-[3px] p-[8px]">
                <h4 className="w-full font-uncial-antiqua text-xl">Nouvelles actions</h4>
                <p>{props.new_actions}</p>
            </div>

            <h3 className="block w-full text-2xl font-uncial-antiqua underline">Notes</h3>
            <div className="w-full flex flex-wrap bg-primary rounded-[3px] p-[8px]">
                <p>{props.notes}</p>
            </div>
        </div>
    )
}