import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type AbilitiesCoC = {
    id: number;
    label: string;
    system_id: number;
};

export async function fetchAbilitiesCoC(): Promise<AbilitiesCoC[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/abilities/system/3');

    if (!res.ok) {
        throw new Error('Échec du chargement des habilités de CoC');
    }

    return res.json();
}

export function useAbilitiesCoC() {
    return useQuery({
        queryKey: ['abilities-CoC'],
        queryFn: fetchAbilitiesCoC,
    });
}