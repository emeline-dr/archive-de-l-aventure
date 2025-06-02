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
    const [sortOption, setSortOption] = useState('az');

    if (isSystemsLoading) return <div>Chargement des systèmes...</div>;
    if (isSystemsError) return <div>Erreur de chargement des systèmes.</div>;

    if (isLoading) return <p>Chargement en cours...</p>
    if (error) return <p>Erreur.</p>
    if (!sheets) return <p>Pas de fiche.</p>;

    let filteredSheets = selectedSystem === 0
        ? sheets
        : sheets.filter(sheet => sheet.system_id === selectedSystem);

    filteredSheets = [...filteredSheets].sort((a, b) => {
        switch (sortOption) {
            case 'az':
                return a.firstname.localeCompare(b.firstname);
            case 'za':
                return b.firstname.localeCompare(a.firstname);
            case 'newest':
                return b.id - a.id;
            case 'oldest':
                return a.id - b.id;
            default:
                return 0;
        }
    });


    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar></Sidebar>
            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className="flex flex-wrap justify-between">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Les registres</h2>


                    <div className='h-fit self-center'>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="p-[8px] me-[16px] bg-primary rounded-lg border border-secondary"
                        >
                            <option value="az">Par ordre alphabétique croissant (A à Z)</option>
                            <option value="za">Par ordre alphabétique décroissant (Z à A)</option>
                            <option value="newest">Du plus récent au plus vieux</option>
                            <option value="oldest">Du plus ancien au plus récent</option>
                        </select>

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