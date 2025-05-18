type Entity = {
    id: number;
    label: string;
};

export type HeaderSheetDnDProps = {
    /* language: string[]; */
    lvl: number;
    exp: number;

    sheet_id: number;
    alignment: string;

    class: Entity;
    subClass: Entity;
    species: Entity;
    /* subSpecies: Entity; */
    originDetails: Entity;
};


export default function HeaderSheetDnD(props: HeaderSheetDnDProps) {
    return (
        <>
            <div className='flex flex-wrap flex-col w-full lg:w-auto gap-[16px] z-1 bg-text-95 py-[16px] px-[32px] text-background border-sm'>
                <div><span className='font-uncial-antiqua text-2xl'>Classe :</span> {props.class?.label} ({props.subClass?.label})</div>
                <div><span className='font-uncial-antiqua text-2xl'>Race :</span> {props.species?.label} {/* {props.subrace ? '(' + props.subrace + ')' : ''} */}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Historique :</span> {props.originDetails?.label}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Alignement :</span> {props.alignment}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Langue(s) :</span> En cours. {/* {props.language.join(', ')} */}</div>
            </div>

            <div className='absolute flex flex-col justify-between end-[40px] w-[150px] h-[250px] z-1'>
                <div className='flex justify-center size-[150px] rounded-full bg-background mt-[40px]'>
                    <span className="self-center text-uncial-antiqua text-[64px]">{props.lvl}</span>
                </div>
                <div className='w-full flex flex-wrap bg-text p-[8px] text-background rounded-sm'>
                    <span className='self-center'>Exp.</span> <span className='flex-1 text-center text-uncial-antiqua text-2xl'>{props.exp}</span>
                </div>
            </div>
        </>
    )
}