import { useQuery } from "@tanstack/react-query";

export type Species = {
    id: number;
    label: string;
    subspecies: string;
};

export async function fetchSpecies(): Promise<{
    Species: Species[];
    uniqueSpecies: Species[];
}> {
    const res = await fetch('https://apidnd.up.railway.app/api/speciesDnD');

    if (!res.ok) {
        throw new Error('Échec du chargement des espèces');
    }

    const Species: Species[] = await res.json();

    const seen = new Set<string>();
    const uniqueSpecies = Species.filter(species => {
        if (seen.has(species.label)) return false;
        seen.add(species.label);
        return true;
    });

    return { Species, uniqueSpecies };
}

export function useSpecies() {
    return useQuery({
        queryKey: ['species-dnd'],
        queryFn: fetchSpecies,
    });
}