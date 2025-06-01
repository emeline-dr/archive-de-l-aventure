import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type AbilitiesL5R = {
    id: number;
    label: string;
    system_id: number;
};

export async function fetchAbilitiesL5R(): Promise<AbilitiesL5R[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/abilities/system/1');

    if (!res.ok) {
        throw new Error('Échec du chargement des habilités de L5R');
    }

    return res.json();
}

export function useAbilitiesL5R() {
    return useQuery({
        queryKey: ['abilities-L5R'],
        queryFn: fetchAbilitiesL5R,
    });
}