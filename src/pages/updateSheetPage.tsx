import { useParams, Link } from "@tanstack/react-router"

import { useSheets } from "../api/sheetApi";

import Sidebar from "../components/sidebar"
import UpdateSheetL5R from "../components/updateFormComponent/UpdateSheetL5R";
import UpdateSheetDnD from "../components/updateFormComponent/UpdateSheetDnD";
import UpdateSheetCoC from "../components/updateFormComponent/UpdateSheetCoC";
import BackgroundIcon from "../components/backgroundIcon"
import { OllamaChatModal } from "../components/ollama/ollamaChatModal";

export default function UpdateSheetPage() {
    const { sheetId } = useParams({ from: '/myCharacters/$sheetId/updateSheet' });

    const { data, isLoading } = useSheets(Number(sheetId));
    if (isLoading || !data) return <div>Chargement...</div>;
    const { sheet } = data;

    const renderUpdateComponent = () => {
        switch (sheet.system_id) {
            case 1: {
                return (
                    <UpdateSheetL5R
                        sheetId={sheet.id}
                    />
                )
            }
            case 2: {
                return (
                    <UpdateSheetDnD
                        sheetId={sheet.id}
                    />
                )
            }
            case 3: {
                return (
                    <UpdateSheetCoC
                        sheetId={sheet.id}
                    />
                )
            }
        }
    };

    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>

            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className='flex flex-wrap start gap-y-[8px]'>
                    <div className="breadcrumb pe-[16px] underline text-accent">
                        <Link to="/myCharacters">Mes aventuriers</Link>
                    </div>
                    <div className="breadcrumb text-background">
                        Fiche de {sheet.firstname} {sheet.lastname ? sheet.lastname : ''}
                    </div>
                </div>

                <div className="flex flex-wrap justify-between">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px] leading-none'>Mise à jour de fiche</h2>

                    {renderUpdateComponent()}
                </div>
            </div>


            <OllamaChatModal />
            <BackgroundIcon></BackgroundIcon>
        </div>
    )
}