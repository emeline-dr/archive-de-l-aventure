type HeaderSheetCoCProps = {
    sheet_id: number;
    occupation: string;
    gender: string;
    age: number;
    residence: string;
    birthplace: string;
}

export default function HeaderSheetCoC(props: HeaderSheetCoCProps) {
    return (
        <>
            <div className='flex flex-wrap flex-col w-full lg:w-auto gap-[16px] z-1 bg-text-95 py-[16px] px-[32px] text-background border-sm'>
                <div><span className='font-uncial-antiqua text-2xl'>Emploi :</span> {props.occupation}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Genre :</span> {props.gender}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Âge :</span> {props.age}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Résidence :</span> {props.residence}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Lieu de naissance :</span> {props.birthplace}</div>
            </div>
        </>
    )
}