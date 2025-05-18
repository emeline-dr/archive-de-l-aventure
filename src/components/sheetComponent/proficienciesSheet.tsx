import { useSheetsDnD } from "../../api/DnD/sheetDnDApi";

type ProficienciesSheetProps = {
    sheet_id: number;
}

export default function ProficienciesSheet(props: ProficienciesSheetProps) {
    const sheet = useSheetsDnD();

    if (sheet.isLoading) return <p>Chargement en cours...</p>
    if (sheet.error) return <p>Erreur.</p>
    if (!sheet.data) return null

    const dndSheet = sheet.data.find(sheet => sheet.sheet_id === props.sheet_id);

    if (!dndSheet) return <p>Aucune fiche correspondante trouvée.</p>;

    return (
        <div className="w-[300px] flex flex-wrap justify-between gap-[8px] p-[8px] rounded-[3px]">
            <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Maîtrises</h3>
            <div className="w-full bg-primary py-[16px] px-[8px] rounded-[3px]">
                <span className="block w-full text-cl font-uncial-antiqua pb-[8px]">Armes</span>
                {dndSheet.weapon_prof}
            </div>

            <div className="w-full bg-primary py-[16px] px-[8px] rounded-[3px]">
                <span className="block w-full text-cl font-uncial-antiqua pb-[8px]">Armures</span>
                {dndSheet.armor_prof}
            </div>

            <div className="w-full bg-primary py-[16px] px-[8px] rounded-[3px]">
                <span className="block w-full text-cl font-uncial-antiqua pb-[8px]">Outils</span>
                {dndSheet.tools_prof}
            </div>
        </div>
    )
}