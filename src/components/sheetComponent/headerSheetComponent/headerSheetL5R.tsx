type Entity = {
    id: number;
    label: string;
};

type HeaderSheetL5RProps = {
    sheet_id: number;
    clan: Entity;
    family: Entity;
    school: Entity;
    school_rank: number;
    exp_total: number;
}

export default function HeaderSheetL5R(props: HeaderSheetL5RProps) {
    return (
        <>
            <div className='flex flex-wrap flex-col justify-evenly w-full lg:w-auto gap-[16px] z-1 bg-text-95 py-[16px] px-[32px] text-background border-sm'>
                <div><span className='font-uncial-antiqua text-2xl'>Clan :</span> {props.clan.label}</div>
                <div><span className='font-uncial-antiqua text-2xl'>Famille :</span> {props.family.label}</div>
                <div><span className='font-uncial-antiqua text-2xl'>École :</span> {props.school.label}</div>
            </div>

            <div className='absolute flex flex-col justify-between end-[40px] w-[150px] h-[250px] z-1'>
                <div className='flex justify-center size-[150px] rounded-full bg-background mt-[40px]'>
                    <span className="self-center text-uncial-antiqua text-[64px]">{props.school_rank}</span>
                </div>
                <div className='w-full flex flex-wrap bg-text p-[8px] text-background rounded-sm'>
                    <span className='self-center'>Exp. Total</span> <span className='flex-1 text-center text-uncial-antiqua text-2xl'>{props.exp_total}</span>
                </div>
            </div>
        </>
    )
}