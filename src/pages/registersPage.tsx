import { useState } from 'react';

import { getDecodedJwt } from '../utils/AuthUtils';
import { useSheetsShared } from '../api/users/userSheetApi';
import { useSystems } from '../api/systemApi';

import Sidebar from '../components/sidebar';
import SheetSnippet from '../components/sheetSnippet';
import BackgroundIcon from '../components/backgroundIcon';

export function RegistersPage() {
    const decodedToken = getDecodedJwt();
    const userId = decodedToken?.id ?? 1;

    const { data: systems, isLoading: isSystemsLoading, isError: isSystemsError } = useSystems();
    const { data: sheets, isLoading, error } = useSheetsShared();

    const [selectedSystem, setSelectedSystem] = useState(0);

    if (isSystemsLoading) return <div>Chargement des systèmes...</div>;
    if (isSystemsError) return <div>Erreur de chargement des systèmes.</div>;

    if (isLoading) return <p>Chargement en cours...</p>
    if (error) return <p>Erreur.</p>
    if (!sheets) return <p>Pas de fiche.</p>;

    const filteredSheets = selectedSystem === 0
        ? sheets
        : sheets.filter(sheet => sheet.system_id === selectedSystem);

    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>
            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className="flex flex-wrap justify-between">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Les registres</h2>

                    <div className='h-fit self-center'>
                        <select
                            value={selectedSystem}
                            onChange={(e) => setSelectedSystem(Number(e.target.value))}
                            className="p-[8px] bg-primary rounded-lg border border-secondary"
                        >
                            <option value={0}>Tous les univers</option>
                            {systems?.map(system => (
                                <option key={system.id} value={system.id}>
                                    {system.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between gap-y-4'>
                    {filteredSheets.length > 0 ? (
                        filteredSheets.map(sheet => (
                            <SheetSnippet
                                id={sheet.id}
                                key={sheet.id}
                                authorId={sheet.user_id}
                                myId={userId}
                                name={sheet.firstname + ' ' + sheet.lastname}
                                img={sheet.avatar_src}
                                system={sheet.system_id}
                                lvl={sheet.lvl}
                            />
                        ))
                    ) : (
                        <p>Aucune fiche trouvée.</p>
                    )}
                </div>
            </div>

            <BackgroundIcon></BackgroundIcon>
        </div>
    )
}