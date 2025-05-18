/* import { useSheets } from '../../api/sheetApi' */
import { useSheetsDnD } from '../../api/DnD/sheetDnDApi'

/* import HeaderSheetL5R from './headerSheetComponent/headerSheetL5R' */
import HeaderSheetDnD from './headerSheetComponent/headerSheetDnD'
/* import HeaderSheetCoC from './headerSheetComponent/headerSheetCoC' */

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

    const sheet = useSheetsDnD();

    if (sheet.isLoading) return <p>Chargement en cours...</p>
    if (sheet.error) return <p>Erreur.</p>
    if (!sheet.data) return null

    const dndSheet = sheet.data.find(sheet => sheet.sheet_id === props.sheet_id);

    if (!dndSheet) return <p>Aucune fiche correspondante trouvée.</p>;

    const renderSheetComponent = () => {
        switch (props.system_id) {
            case 1:
                return 'l5r';
            case 2:
                return <HeaderSheetDnD
                    sheet_id={dndSheet.sheet_id}
                    class={dndSheet.class}
                    subClass={dndSheet.subClass}
                    species={dndSheet.species}
                    /* subSpecies={dndSheet.subSpecies} */
                    originDetails={dndSheet.originDetails}
                    alignment={dndSheet.alignment}
                    /* language={dndSheet.language} */
                    lvl={dndSheet.lvl}
                    exp={dndSheet.exp}
                />;
            case 3:
                return 'coc';
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