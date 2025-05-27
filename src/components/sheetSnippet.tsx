import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { useFavoritesSheet, AddFavoritesSheetToUser, RemoveFavoritesSheetFromUser } from "../api/favoriteSheetApi";
import { useUserById } from "../api/users/userApi";

import bgL5R from '../assets/images/bg-lcinqa.webp';
import bgDnD from '../assets/images/bg-dnd.png';
import bgCoC from '../assets/images/bg-cthulhu.jpg';

type SheetSnippetProps = {
    id: number;
    authorId: number;
    myId: number;
    username?: string;
    img: string;
    name: string;
    lvl: number;
    system: number;
};

function SheetSnippet(props: SheetSnippetProps) {
    const queryClient = useQueryClient();
    const favoritesSheet = useFavoritesSheet();

    const [favorite, setFavorite] = useState<boolean | undefined>(undefined);

    const location = useRouterState({ select: (s) => s.location });

    const isMyCharactersPage = location.pathname.includes('/myCharacters') || location.pathname.includes('/index');

    useEffect(() => {
        if (Array.isArray(favoritesSheet.data)) {
            const isFavorite = favoritesSheet.data.some(fav => fav.user_id === props.myId && fav.sheet_id === props.id);
            setFavorite(isFavorite);
        } else {
            setFavorite(undefined);
        }
    }, [favoritesSheet.data, props.myId, props.id]);

    const authorInfos = useUserById(props.authorId);

    const addFavoriteMutation = useMutation({
        mutationFn: () =>
            AddFavoritesSheetToUser(
                props.authorId,
                props.id,
                props.myId
            ),
        onSuccess: () => {
            setFavorite(true);
            queryClient.invalidateQueries({ queryKey: ['favorites-sheets-by-users'] });
        },
        onError: () => alert("Erreur lors de l'ajout aux favoris"),
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: () => {
            if (!favoritesSheet.data || favoritesSheet.data.length === 0) {
                throw new Error("Aucune donnée de favoris disponible");
            }

            const currentFavorite = favoritesSheet.data.find(fav => fav.user_id === props.myId && fav.sheet_id === props.id);

            if (!currentFavorite || !currentFavorite.id) {
                throw new Error("Favori introuvable ou ID manquant");
            }

            return RemoveFavoritesSheetFromUser(currentFavorite.id);
        },
        onSuccess: () => {
            setFavorite(false);
            queryClient.invalidateQueries({ queryKey: ['favorites-sheets-by-users'] });
        },
        onError: () => alert("Erreur lors de la suppression des favoris"),
    });

    let bgSystem = '';

    switch (props.system) {
        case 1:
            bgSystem = bgL5R
            break;
        case 2:
            bgSystem = bgDnD
            break;
        case 3:
            bgSystem = bgCoC
            break;
    }

    return (
        <div className="relative flex flex-wrap justify-start w-full lg:w-[49%] h-[135px] py-[27px] px-[16px] bg-primary rounded-[5px]">
            <img src={`/src/assets/images${props.img}`} alt={`Avatar de ${props.name}`} className="size-[80px] object-cover outline-3 outline-secondary rounded-sm" />
            <div className="flex flex-wrap flex-col justify-center ms-[8px]">
                <span className="w-[150px] md:w-full lg:w-[100px] xl:w-[250px] font-uncial-antiqua text-2xl truncate">
                    <Link
                        to={`${isMyCharactersPage ? '/myCharacters' : '/registers'}/${props.id}`}
                    >
                        {props.name}
                    </Link>
                </span>
                <span className="w-[150px] md:w-full lg:w-[100px] xl:w-full truncate"></span>
                {props.authorId != props.myId &&
                    <span className="w-[150px] md:w-full lg:w-[100px] xl:w-full truncate">Appartient à : {props.username || authorInfos.data?.username}</span>
                }
            </div>
            {props.authorId != props.myId &&
                <button
                    onClick={() => {
                        if (favorite) {
                            removeFavoriteMutation.mutate();
                        } else {
                            addFavoriteMutation.mutate();
                        }
                    }}
                    className="absolute top-[8px] end-[143px] cursor-pointer text-[24px] hover:bg-text hover:text-accent hover:p-1 hover:rounded-sm">
                    {favorite === false && <i className="fa-regular fa-heart"></i>}
                    {favorite === true && <i className="fa-solid fa-heart"></i>}
                </button>
            }
            <div className="absolute top-0 end-0 w-[127px] h-[135px]">
                <img src={bgSystem} alt="" className="absolute top-0 start-0 w-full h-full object-cover rounded-r-[5px] opacity-[.55]" />
                <div className="absolute top-0 start-0 bg-accent h-full w-full rounded-r-[5px] mix-blend-hue"></div>
            </div>
            <div className="absolute top-[20px] end-[16px] size-[95px] flex flex-wrap justify-center content-center rounded-full border-2 border-text font-uncial-antiqua text-4xl">
                {props.lvl}
            </div>
        </div>
    );
}

export default SheetSnippet;