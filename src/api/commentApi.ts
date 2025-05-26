import { useQuery } from "@tanstack/react-query";

export type Comments = {
    id: number;
    user_id: number;
    text: string;
    sheet_id: number;
};

export async function fetchCommentsBySheetId(sheet_id: number): Promise<Comments[]> {
    const res = await fetch(`https://apidnd.up.railway.app/api/comment/sheet/${sheet_id}`);

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