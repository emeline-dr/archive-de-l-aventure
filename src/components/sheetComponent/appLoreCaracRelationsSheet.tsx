import { useSheetsDnD } from "../../api/DnD/sheetDnDApi";

type AppLoreCaracRelationsSheetProps = {
    sheet_id: number;
}

export default function AppLoreCaracRelationsSheet(props: AppLoreCaracRelationsSheetProps) {
    const sheet = useSheetsDnD();

    if (sheet.isLoading) return <p>Chargement en cours...</p>
    if (sheet.error) return <p>Erreur.</p>
    if (!sheet.data) return null

    const dndSheet = sheet.data.find(sheet => sheet.sheet_id === props.sheet_id);
    if (!dndSheet) return <p>Aucune fiche correspondante trouvée.</p>;

    return (
        <div className="w-full flex flex-wrap justify-between gap-[40px]">
            <div className="w-full">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Apparence</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {dndSheet.apparence ? dndSheet.apparence : 'Rien.'}
                </div>
            </div>
            <div className="w-full">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Histoire</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {dndSheet.histoire ? dndSheet.histoire : 'Rien.'}
                </div>
            </div>
            <div className="w-full">
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Traits de caractère</h3>
                <div className="w-full p-[16px] bg-primary text-base rounded-[3px]">
                    {dndSheet.caractere ? dndSheet.caractere : 'Rien.'}
                </div>
            </div>
            <div className="w-full flex flex-wrap gap-[16px]">
                <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Relations</h3>
                <div className="flex-1 bg-primary p-[16px] text-base rounded-[3px]">
                    <h4 className="text-xl font-uncial-antiqua">Alliés</h4><br />
                    {dndSheet.allies ? dndSheet.allies : 'Rien.'}
                </div>
                <div className="flex-1 bg-primary p-[16px] text-base rounded-[3px]">
                    <h4 className="text-xl font-uncial-antiqua">Ennemis</h4><br />
                    {dndSheet.ennemies ? dndSheet.ennemies : 'Rien.'}
                </div>
            </div>
        </div>
    )
}