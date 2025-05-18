import { useSheetsDnD } from "../../api/DnD/sheetDnDApi";

import HealthSheetDnD from "./healthSheetComponent/healthSheetDnd";

type HealthSheetProps = {
    sheet_id: number;
    system_id: number;
}

export default function HealthSheet(props: HealthSheetProps) {
    const sheet = useSheetsDnD();

    if (sheet.isLoading) return <p>Chargement en cours...</p>
    if (sheet.error) return <p>Erreur.</p>
    if (!sheet.data) return null

    const dndSheet = sheet.data.find(sheet => sheet.sheet_id === props.sheet_id);

    if (!dndSheet) return <p>Aucune fiche correspondante trouvée.</p>;

    const renderHealthSheetComponent = () => {
        switch (props.system_id) {
            case 1:
                return 'l5r';
            case 2:
                return <HealthSheetDnD
                    sheet_id={dndSheet.sheet_id}
                    hit_dice={dndSheet.hit_dice}
                    max_hp={dndSheet.max_hp}
                    hp={dndSheet.hp}
                />
            case 3:
                return 'coc';
        }
    };

    return (
        <div className="w-[300px] flex flex-wrap justify-between gap-[8px] bg-primary p-[8px] rounded-[3px]">
            {renderHealthSheetComponent()}
        </div>
    )
}