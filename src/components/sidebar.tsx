import { Link } from '@tanstack/react-router';

import { getDecodedJwt } from '../utils/AuthUtils';
import { useSheetsByUsers } from '../api/users/userSheetApi';

function Sidebar() {
    const decodedToken = getDecodedJwt();

    const userId = decodedToken?.id ?? 1;

    const { data: sheets, isLoading, isError } = useSheetsByUsers(userId);

    return (
        <aside className="h-auto hidden md:flex flex-wrap justify-center content-start top-0 py-[20px] w-[50px] xl:w-[120px] bg-primary transition-all duration-300">
            {isLoading && <p className="text-center text-white">Chargement...</p>}
            {isError && <p className="text-center text-red-500">Erreur de chargement</p>}

            {sheets?.map((sheet) => (
                <Link
                    key={sheet.id}
                    to={`/myCharacters/${sheet.id}`}
                    className="w-full flex flex-col items-center"
                >
                    <img
                        src={`/src/assets/images${sheet.avatar_src}`}
                        alt={`Avatar de ${sheet.firstname} ${sheet.lastname}`}
                        className="mx-[20px] size-[40px] xl:size-[80px] object-cover outline-3 outline-secondary rounded-xs"
                    />
                    <span className="block w-full text-center font-uncial-antiqua text-lg mt-[8px] mb-[16px] truncate">
                        {sheet.firstname} {sheet.lastname}
                    </span>
                </Link>
            ))}

            <Link to="/myCharacters/newSheet">
                <button className="mt-[16px] text-xl cursor-pointer">
                    <i className="fa-solid fa-plus p-2 outline-3 outline-text rounded-full"></i>
                </button>
            </Link>
        </aside>
    );
}

export default Sidebar;
