import { useQuery } from "@tanstack/react-query";

export type AbilitiesDnD = {
    id: number;
    label: string;
    system_id: number;
};

export async function fetchAbilitiesDnD(): Promise<AbilitiesDnD[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/abilities/system/2');

    if (!res.ok) {
        throw new Error('Échec du chargement des habilités de DnD');
    }

    return res.json();
}

export function useAbilitiesDnD() {
    return useQuery({
        queryKey: ['abilities-DnD'],
        queryFn: fetchAbilitiesDnD,
    });
}