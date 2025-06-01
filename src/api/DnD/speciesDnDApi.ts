import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type Species = {
    id: number;
    label: string;
};

export type SubSpecies = {
    id: number;
    label: string;
    species_id: number;
};


/* Appel des espèces */
export async function fetchSpecies(): Promise<Species[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/speciesDnD');

    if (!res.ok) {
        throw new Error('Échec du chargement des espèces');
    }

    return res.json();
}

export function useSpecies() {
    return useQuery({
        queryKey: ['species-dnd'],
        queryFn: fetchSpecies,
    });
}

/* Appel des sous-espèces */
export async function fetchSubSpecies(): Promise<SubSpecies[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/subSpeciesDnD');

    if (!res.ok) {
        throw new Error('Échec du chargement des sous-espèces');
    }

    return res.json();
}

export function useSubSpecies() {
    return useQuery({
        queryKey: ['subspecies-dnd'],
        queryFn: fetchSubSpecies,
    });
}