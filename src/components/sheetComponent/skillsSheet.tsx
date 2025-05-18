import { useSheetsDnD } from "../../api/DnD/sheetDnDApi";

import SkillsSheetDnD from "./skillsSheetComponent/skillsSheetDnD";

type SkillsSheetProps = {
    sheet_id: number;
    system_id: number;
}

export default function SkillsSheet(props: SkillsSheetProps) {
    const sheet = useSheetsDnD();

    if (sheet.isLoading) return <p>Chargement en cours...</p>
    if (sheet.error) return <p>Erreur.</p>
    if (!sheet.data) return null

    const dndSheet = sheet.data.find(sheet => sheet.sheet_id === props.sheet_id);

    if (!dndSheet) return <p>Aucune fiche correspondante trouvée.</p>;

    const renderSkillsSheetComponent = () => {
        switch (props.system_id) {
            case 1:
                return 'l5r';
            case 2:
                return <SkillsSheetDnD
                    skills={dndSheet.skills}
                />
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