import { useRouter } from "@tanstack/react-router";

import { useSheets } from "../../api/sheetApi";

import HealthSheetL5R from "./healthSheetComponent/healthSheetL5R";
import HealthSheetDnD from "./healthSheetComponent/healthSheetDnd";
import HealthSheetCoC from "./healthSheetComponent/healthSheetCoC";

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
            case 1: {
                const sheetL5R = sheet;
                if (!sheetL5R) return <p>Fiche L5R introuvable.</p>;
                return (
                    <HealthSheetL5R
                        endurance={sheetL5R.details.endurance ?? 0}
                        endu_fatigue={sheetL5R.details.endurance_fatigue ?? 0}
                        composure={sheetL5R.details.composure ?? 0}
                        composure_strife={sheetL5R.details.composure_strife ?? 0}
                        focus={sheetL5R.details.focus ?? 0}
                        vigilance={sheetL5R.details.vigilance ?? 0}
                        void_max={sheetL5R.details.void_points_max ?? 0}
                        void_now={sheetL5R.details.void_points_current ?? 0}
                    />
                )
            };
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
            case 3: {
                const sheetCoC = sheet;
                if (!sheetCoC) return <p>Fiche CoC introuvable.</p>;
                return (
                    <HealthSheetCoC
                        hit_point={sheetCoC.details.hit_point ?? 0}
                        major_wound={sheetCoC.details.major_wounds ?? 0}
                        dying={sheetCoC.details.dying ?? false}
                        unconscious={sheetCoC.details.unconsious ?? false}
                        magic_points={sheetCoC.details.magic_points ?? 0}
                        luck={sheetCoC.details.luck ?? 0}
                    />
                )
            };
        }
    };

    return (
        <div className="min-w-[300px] max-w-[450px] h-fit flex flex-wrap justify-between gap-[8px] bg-primary p-[8px] rounded-[3px]">
            {renderHealthSheetComponent()}
        </div>
    )
}