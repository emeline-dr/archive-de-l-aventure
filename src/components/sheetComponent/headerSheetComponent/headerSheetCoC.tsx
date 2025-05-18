type HeaderSheetCoCProps = {
    class: string;
    subclass: string;
    race: string;
    subrace: string | null;
    origin: string;
    alignement: string;
    language: string[],
    lvl: number,
    exp: number,
}

export default function HeaderSheetCoC(props: HeaderSheetCoCProps) {
    return (
        <>
            <div className='flex flex-wrap flex-col w-full lg:w-auto gap-[16px] z-1 bg-text-95 py-[16px] px-[32px] text-background border-sm'>
                <div><span className='font-uncial-antiqua text-2xl'>Classe :</span> {props.class} ({props.subclass})</div>
                <div><span className='font-uncial-antiqua text-2xl'>Race :</span> {props.race} {props.subrace ? '(' + props.subrace + ')' : ''}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Historique :</span> {props.origin}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Alignement :</span> {props.alignement}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Langue(s) :</span> {props.language.join(', ')}</div>
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