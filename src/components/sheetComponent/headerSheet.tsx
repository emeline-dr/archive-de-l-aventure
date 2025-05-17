import bgDnd from '../../assets/images/bg-dnd.png'

type HeaderSheetProps = {
    system_id: number;
    avatar: string;
    firstname: string;
    lastname: string | null;
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

function HeaderSheet(props: HeaderSheetProps) {
    const backgroundImageStyle = props.system_id === 2
        ? {
            backgroundImage: `url(${bgDnd})`,
            backgroundSize: 'cover',
            backgroundBlendMode: 'luminosity',
            backgroundColor: 'var(--color-background)'
        }
        : {}

    return (
        <div
            className="relative flex flex-wrap justify-start gap-[40px] w-full p-[40px] my-[40px] rounded-[3px]"
            style={backgroundImageStyle}
        >
            <div className='absolute z-1 top-0 start-0 w-full h-full bg-accent-25'></div>
            <img
                src={props.avatar}
                alt={`Avatar de ${props.firstname} ${props.lastname ? props.lastname : ''}`}
                className='object-cover z-1 w-[150px] h-[250px] lg:w-[200px] rounded-[3px] border-3 border-secondary'
            />

            <div className='flex flex-wrap flex-col w-full lg:w-auto gap-[16px] z-1 bg-text-95 py-[16px] px-[32px] text-background border-sm'>
                <div><span className='font-uncial-antiqua text-2xl'>Classe :</span> {props.class} ({props.subclass})</div>
                <div><span className='font-uncial-antiqua text-2xl'>Race :</span> {props.race} {props.lastname ? '(' + props.subrace + ')' : ''}</div>
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
        </div>
    )
}

export default HeaderSheet