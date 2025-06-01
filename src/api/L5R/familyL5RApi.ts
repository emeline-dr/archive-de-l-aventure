import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type Family = {
    id: number;
    label: string;
};

export async function fetchFamily(): Promise<Family[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/familyL5R');

    if (!res.ok) {
        throw new Error('Échec du chargement des familles');
    }

    return res.json();
}

export function useFamily() {
    return useQuery({
        queryKey: ['family-l5r'],
        queryFn: fetchFamily,
        staleTime: 1000 * 60 * 5,
    });
}