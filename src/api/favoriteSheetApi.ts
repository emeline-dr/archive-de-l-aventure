type FavoritesSheet = {
    id: number;
    owner_id: number;
    sheet_id: number;
    user_id: number;
}

export async function AddFavoritesSheetToUser(
    id: number,
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
            id,
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