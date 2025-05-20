import { useQuery } from "@tanstack/react-query";

type FavoritesSheet = {
    id: number;
    owner_id: number;
    sheet_id: number;
    user_id: number;
}

type FavoritesSheetById = {
    avatar_src: string;
    lvl: number;
    firstname: string;
    lastname: string;
    username: string;
    system_id: number;
    sheet_id: number;
    owner_id: number;
}

export async function FetchFavoritesSheet(): Promise<FavoritesSheet[]> {
    const response = await fetch(`https://apidnd.up.railway.app/api/favoritesSheet`);

    if (!response.ok) {
        throw new Error('Erreur lors du chargement des fiches préférées');
    }

    const data = await response.json();

    return data as FavoritesSheet[];
}

export function useFavoritesSheet() {
    return useQuery({
        queryKey: ['favorites-sheets'],
        queryFn: FetchFavoritesSheet,
    });
}

export async function FetchFavoritesSheetById(userId: number): Promise<FavoritesSheetById[]> {
    const response = await fetch(`https://apidnd.up.railway.app/api/favoritesSheet/user/${userId}`);

    if (!response.ok) {
        throw new Error('Erreur lors du chargement des fiches préférées de ce user');
    }

    const data = await response.json();

    return data as FavoritesSheetById[];
}

export const useFavoritesSheetById = (userId: number) => {
    return useQuery({
        queryKey: ['favorite-by-id', userId],
        queryFn: () => FetchFavoritesSheetById(userId),
        enabled: !!userId,
    });
}

export async function AddFavoritesSheetToUser(
    owner_id: number,
    sheet_id: number,
    user_id: number
): Promise<FavoritesSheet> {
    const response = await fetch(`https://apidnd.up.railway.app/api/favoritesSheet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner_id,
            sheet_id,
            user_id
        }),
    })

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de fiches favorites");
    }

    const data = await response.json();
    return data as FavoritesSheet;
}

export async function RemoveFavoritesSheetFromUser(favoriteId: number): Promise<void> {
    const response = await fetch(`https://apidnd.up.railway.app/api/favoritesSheet/${favoriteId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la fiche favorite");
    }
}
