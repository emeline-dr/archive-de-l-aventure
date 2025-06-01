import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export type Comments = {
    id: number;
    username: string;
    user_id: number;
    text: string;
    sheet_id: number;
    create_at: string;
};

export async function fetchCommentsBySheetId(sheet_id: number): Promise<Comments[]> {
    const res = await fetchWithAuth(`https://apidnd.up.railway.app/api/comment/sheet/${sheet_id}`);

    if (!res.ok) {
        throw new Error('Échec du chargement des commentaires de la fiche ' + sheet_id);
    }

    return res.json();
}

export function useCommentsBySheetId(sheet_id: number) {
    return useQuery({
        queryKey: ['comments'],
        queryFn: () => fetchCommentsBySheetId(sheet_id),
        enabled: !!sheet_id,
    });
}