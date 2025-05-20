import { useRouter } from "@tanstack/react-router";

import { useSheets } from "../../api/sheetApi";

/* import SkillsSheetDnD from "./skillsSheetComponent/skillsSheetDnD";
 */
type SkillsSheetProps = {
    sheet_id: number;
    system_id: number;
}

export default function SkillsSheet(props: SkillsSheetProps) {
    const router = useRouter();

    const matchWithSheetId = router.state.matches.find(
        (match) => match.params.sheetId
    );

    const sheetId = matchWithSheetId?.params?.sheetId;
    const { data: sheet, isLoading, error } = useSheets(Number(sheetId));

    if (isLoading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur de chargement.</p>;

    const renderSkillsSheetComponent = () => {
        switch (props.system_id) {
            case 1:
                return 'l5r';
            case 2: {
                const sheetDnD = sheet;
                if (!sheetDnD) return <p>Fiche DnD introuvable.</p>;
                return "dnd" /* (<SkillsSheetDnD
                    skills={sheetDnD.skills}
                />) */
            }
            case 3:
                return 'coc';
        }
    };

    return (
        <div className="flex-1 flex flex-wrap justify-between gap-[8px] p-[8px] rounded-[3px]">
            <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Compétences</h3>
            {renderSkillsSheetComponent()}
        </div>
    )
}