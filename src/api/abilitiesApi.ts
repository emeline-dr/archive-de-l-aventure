import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export type Abilities = {
    id: number;
    label: string;
    system_id: number;
};

export async function fetchAbilities(): Promise<Abilities[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/abilities');

    if (!res.ok) {
        throw new Error('Échec du chargement des habilités');
    }

    return res.json();
}

export function useAbilities() {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchAbilities,
    });
}