import { useSheets } from '../../api/sheetApi';
import { useRouter } from '@tanstack/react-router';

import HeaderSheetL5R from './headerSheetComponent/headerSheetL5R';
import HeaderSheetDnD from './headerSheetComponent/headerSheetDnD';
import HeaderSheetCoC from './headerSheetComponent/headerSheetCoC';

import bgL5R from '../../assets/images/bg-lcinqa.webp';
import bgDnd from '../../assets/images/bg-dnd.png';
import bgCoC from '../../assets/images/bg-cthulhu.jpg';

type HeaderSheetProps = {
    sheet_id: number;
    avatar: string;
    firstname: string;
    lastname: string | null;
    system_id: number;
};

function HeaderSheet(props: HeaderSheetProps) {
    const backgroundImages: Record<number, string> = {
        1: `url(${bgL5R})`,
        2: `url(${bgDnd})`,
        3: `url(${bgCoC})`,
    };

    const backgroundImageStyle = () => backgroundImages[props.system_id] || 'none';

    const router = useRouter();

    const matchWithSheetId = router.state.matches.find(
        (match) => match.params.sheetId
    );

    const sheetId = matchWithSheetId?.params?.sheetId;

    const { data: sheet, isLoading, error } = useSheets(Number(sheetId));

    if (isLoading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur de chargement.</p>;

    const renderSheetComponent = () => {
        switch (props.system_id) {
            case 1: {
                const sheetL5R = sheet;
                if (!sheetL5R) return <p>Fiche L5R introuvable.</p>;
                return (
                    <HeaderSheetL5R
                        sheet_id={sheetL5R.details.sheet_id}
                        clan={sheetL5R.clanL5R?.label || ''}
                        family={sheetL5R.familyL5R?.label || ''}
                        school={sheetL5R.schoolL5R?.label || ''}
                        school_rank={sheetL5R.details?.school_rank || 0}
                        lvl={sheetL5R.sheet.lvl || 0}
                        exp_total={sheetL5R.details?.exp_total || 0}
                        exp_saved={sheetL5R.details.exp_saved || 0}
                        exp_spent={sheetL5R.details.expo_spent || 0}
                    />
                );
            }

            case 2: {
                const sheetDnD = sheet;
                if (!sheetDnD) return <p>Fiche DnD introuvable.</p>;
                return (
                    <HeaderSheetDnD
                        sheet_id={sheet.details.sheet_id}
                        class={sheet.classeDnD?.label || ''}
                        subClass={sheet.subClasseDnD?.label || ''}
                        species={sheet.speciesDnD?.label || ''}
                        subSpecies={sheet.subSpeciesDnD?.label || ''}
                        originDetails={sheet.origineDnD?.label || ''}
                        alignment={sheet.details?.alignment ?? ''}
                        lvl={sheet.sheet.lvl}
                        exp={sheet.details?.exp ?? 0}
                        language={Array.isArray(sheet.language)
                            ? sheet.language.map(lang => lang.label).join(', ')
                            : sheet.language?.label || 'Aucune langue'}
                    />
                );
            }

            case 3: {
                const sheetCoC = sheet;
                if (!sheetCoC) return <p>Fiche CoC introuvable.</p>;
                return (
                    <HeaderSheetCoC
                        sheet_id={sheetCoC.details?.sheet_id}
                        occupation={sheetCoC.details?.occupation || ''}
                        age={sheetCoC.details?.age || 0}
                        gender={sheetCoC.details?.gender || ''}
                        residence={sheetCoC.details?.residence || ''}
                        birthplace={sheetCoC.details?.birthplace || ''}
                        lvl={sheetCoC.sheet.lvl}
                    />
                );
            }

            default:
                return null;
        }
    };

    return (
        <div
            className="relative bg-cover bg-background bg-blend-luminosity flex flex-wrap justify-start gap-[40px] w-full p-[40px] my-[40px] rounded-[3px]"
            style={{ backgroundImage: backgroundImageStyle() }}
        >
            <div className="absolute z-1 top-0 start-0 w-full h-full bg-accent-25"></div>
            <img
                src={`${props.avatar}`}
                alt={`Avatar de ${props.firstname} ${props.lastname ? props.lastname : ''}`}
                className="object-cover z-1 w-[150px] h-[250px] lg:w-[200px] rounded-[3px] border-3 border-secondary"
            />

            {renderSheetComponent()}
        </div>
    );
}

export default HeaderSheet;
