/* import { useSheets } from '../../api/sheetApi' */

import { useSheetsL5R } from '../../api/L5R/sheetL5RApi'
import { useSheetsDnD } from '../../api/DnD/sheetDnDApi'
import { useSheetsCoC } from '../../api/CoC/sheetCoCApi';

import type { SheetL5R } from '../../api/L5R/sheetL5RApi';
import type { SheetDnD } from '../../api/DnD/sheetDnDApi';
import type { SheetCoC } from '../../api/CoC/sheetCoCApi';

import HeaderSheetL5R from './headerSheetComponent/headerSheetL5R'
import HeaderSheetDnD from './headerSheetComponent/headerSheetDnD'
import HeaderSheetCoC from './headerSheetComponent/headerSheetCoC'

import bgL5R from '../../assets/images/bg-lcinqa.webp'
import bgDnd from '../../assets/images/bg-dnd.png'
import bgCoC from '../../assets/images/bg-cthulhu.jpg'

type HeaderSheetProps = {
    system_id: number;
    sheet_id: number;
    avatar: string;
    firstname: string;
    lastname: string | null;
}

function HeaderSheet(props: HeaderSheetProps) {
    const backgroundImages: Record<number, string> = {
        1: `url(${bgL5R})`,
        2: `url(${bgDnd})`,
        3: `url(${bgCoC})`
    };

    const backgroundImageStyle = () => backgroundImages[props.system_id] || "none";

    const l5rSheet = useSheetsL5R();
    const dndSheet = useSheetsDnD();
    const cocSheet = useSheetsCoC();

    let sheet;
    switch (props.system_id) {
        case 1:
            sheet = l5rSheet;
            break;
        case 2:
            sheet = dndSheet;
            break;
        case 3:
            sheet = cocSheet;
            break;
        default:
            sheet = { isLoading: false, error: null, data: null };
    }

    if (sheet.isLoading) return <p>Chargement en cours...</p>;
    if (sheet.error) return <p>Erreur de chargement.</p>;
    if (!sheet.data) return null;

    const selectedSheet = sheet.data.find(s => s.sheet_id === props.sheet_id);
    if (!selectedSheet) return <p>Aucune fiche trouvée.</p>;

    const renderSheetComponent = () => {
        if (props.system_id === 1) {
            const sheetL5R = selectedSheet as SheetL5R;
            return (
                <HeaderSheetL5R
                    sheet_id={sheetL5R.sheet_id}
                    clan={sheetL5R.clan}
                    family={sheetL5R.family}
                    school={sheetL5R.school}
                    school_rank={sheetL5R.school_rank}
                    exp_total={sheetL5R.exp_total}
                />
            );
        }

        if (props.system_id === 2) {
            const sheetDnD = selectedSheet as SheetDnD;
            return (
                <HeaderSheetDnD
                    sheet_id={sheetDnD.sheet_id}
                    class={sheetDnD.class}
                    subClass={sheetDnD.subClass}
                    species={sheetDnD.species}
                    originDetails={sheetDnD.originDetails}
                    alignment={sheetDnD.alignment}
                    lvl={sheetDnD.lvl}
                    exp={sheetDnD.exp}
                />
            );
        }

        if (props.system_id === 3) {
            const sheetCoC = selectedSheet as SheetCoC;
            return (
                <HeaderSheetCoC
                    sheet_id={sheetCoC.sheet_id}
                    occupation={sheetCoC.occupation}
                    age={sheetCoC.age}
                    gender={sheetCoC.gender}
                    residence={sheetCoC.residence}
                    birthplace={sheetCoC.birthplace}
                />
            );
        }
    };

    return (
        <div
            className="relative bg-cover bg-background bg-blend-luminosity flex flex-wrap justify-start gap-[40px] w-full p-[40px] my-[40px] rounded-[3px]"
            style={{ backgroundImage: backgroundImageStyle() }}
        >
            <div className='absolute z-1 top-0 start-0 w-full h-full bg-accent-25'></div>
            <img
                src={`/src/assets/images${props.avatar}`}
                alt={`Avatar de ${props.firstname ? props.firstname : 'Arlahne'} ${props.lastname ? props.lastname : ''}`}
                className='object-cover z-1 w-[150px] h-[250px] lg:w-[200px] rounded-[3px] border-3 border-secondary'
            />

            {renderSheetComponent()}
        </div>
    )
}

export default HeaderSheet