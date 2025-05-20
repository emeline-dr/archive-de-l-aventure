import { Link } from '@tanstack/react-router';

import Sidebar from '../components/sidebar';
import SheetSnippet from '../components/sheetSnippet';
import BackgroundIcon from '../components/backgroundIcon';

import { getDecodedJwt } from '../utils/AuthUtils';
import { useSheetsByUsers } from '../api/users/userSheetApi';
import { useFavoritesSheetById } from '../api/favoriteSheetApi';

export default function IndexPage() {

    const decodedToken = getDecodedJwt();

    const userId = decodedToken?.id ?? 1;
    const { data, isLoading, isError } = useSheetsByUsers(userId);
    const { data: favoritesData } = useFavoritesSheetById(userId);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (isError) {
        return <div>Erreur de chargement des données.</div>;
    }

    if (!data) return <p>Pas de fiche.</p>

    return (
        <div className='pageContenant flex flex-wrap h-full'>
            <Sidebar />
            <div className='flex-1 z-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className="flex justify-end">
                    <Link to="/myCharacters/newSheet">
                        <button className="btn btn-text">Créer un nouvel aventurier</button>
                    </Link>
                </div>
                <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Mes derniers ajouts</h2>
                <div className='flex flex-wrap justify-between gap-y-4'>
                    {data.length > 0 ? (
                        data.slice(0, 5).map(sheet => (
                            <SheetSnippet
                                id={sheet.id}
                                key={sheet.id}
                                authorId={sheet.user_id}
                                username={sheet.username}
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

                <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Mes favoris</h2>
                <div className='flex flex-wrap justify-between gap-y-4'>
                    {favoritesData && (Array.isArray(favoritesData) ? favoritesData : [favoritesData]).map(sheet => (
                        <SheetSnippet
                            id={sheet.sheet_id}
                            key={sheet.sheet_id}
                            authorId={sheet.owner_id}
                            username={sheet.username}
                            myId={userId}
                            name={sheet.firstname + ' ' + sheet.lastname}
                            img={sheet.avatar_src}
                            system={sheet.system_id}
                            lvl={sheet.lvl}
                        />
                    ))}
                </div>

            </div>

            <BackgroundIcon />
        </div>
    );
}