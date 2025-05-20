import { useRouter } from "@tanstack/react-router";

import { useSheets } from "../../api/sheetApi";

import HealthSheetDnD from "./healthSheetComponent/healthSheetDnd";

type HealthSheetProps = {
    sheet_id: number;
    system_id: number;
}

export default function HealthSheet(props: HealthSheetProps) {
    const router = useRouter();

    const matchWithSheetId = router.state.matches.find(
        (match) => match.params.sheetId
    );

    const sheetId = matchWithSheetId?.params?.sheetId;

    const { data: sheet, isLoading, error } = useSheets(Number(sheetId));

    if (isLoading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur de chargement.</p>;

    const renderHealthSheetComponent = () => {
        switch (props.system_id) {
            case 1:
                return 'l5r';
            case 2: {
                const sheetDnD = sheet;
                if (!sheetDnD) return <p>Fiche DnD introuvable.</p>;
                return (<HealthSheetDnD
                    sheet_id={sheetDnD.details.sheet_id}
                    abilities={sheetDnD.abilities}
                    hit_dice={sheetDnD.details.hit_dice || ''}
                    max_hp={sheetDnD.details.max_hp ?? 0}
                    hp={sheetDnD.details.hp ?? 0}
                />
                );
            }
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