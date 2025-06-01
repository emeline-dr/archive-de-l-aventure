import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type Clan = {
    id: number;
    label: string;
};

export async function fetchClan(): Promise<Clan[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/clanL5R');

    if (!res.ok) {
        throw new Error('Échec du chargement des clans');
    }

    return res.json();
}

export function useClan() {
    return useQuery({
        queryKey: ['clan-l5r'],
        queryFn: fetchClan,
        staleTime: 1000 * 60 * 5,
    });
}