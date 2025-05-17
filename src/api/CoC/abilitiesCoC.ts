import { useQuery } from "@tanstack/react-query";

export type AbilitiesCoC = {
    id: number;
    label: string;
    system_id: number;
};

export async function fetchAbilitiesCoC(): Promise<AbilitiesCoC[]> {
    const res = await fetch('https://apiCoC.up.railway.app/api/abilities/system/3');

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