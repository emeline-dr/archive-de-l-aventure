import { useRouter } from "@tanstack/react-router";

import { useSheets } from "../../api/sheetApi";

import SkillsSheetL5R from "./skillsSheetComponent/skillsSheetL5R";
import SkillsSheetDnD from "./skillsSheetComponent/skillsSheetDnD";
import SkillsSheetCoC from "./skillsSheetComponent/skillsSheetCoC";

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
            case 1: {
                const sheetL5R = sheet;
                if (!sheetL5R) return <p>Fiche L5R introuvable.</p>;
                return (
                    <SkillsSheetL5R
                        skills={sheetL5R.skill}
                    />
                )
            }
            case 2: {
                const sheetDnD = sheet;
                if (!sheetDnD) return <p>Fiche DnD introuvable.</p>;
                return (
                    <SkillsSheetDnD
                        skills={sheetDnD.skill}
                    />
                )
            }
            case 3: {
                const sheetCoC = sheet;
                if (!sheetCoC) return <p>Fiche CoC introuvable.</p>;
                return (
                    <SkillsSheetCoC
                        skills={sheetCoC.skill}
                    />
                )
            }
        }
    };

    return (
        <div className="flex-1 flex flex-wrap justify-between rounded-[3px]">
            <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Compétences</h3>
            {renderSkillsSheetComponent()}
        </div>
    )
}