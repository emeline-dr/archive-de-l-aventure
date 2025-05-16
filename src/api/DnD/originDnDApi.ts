import { useQuery } from "@tanstack/react-query";

export type Origin = {
    id: number,
    label: string,
}

export async function fetchOrigin(): Promise<Origin[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/origineDnD');

    if (!res.ok) {
        throw new Error('Échec du chargement des origines');
    }

    return res.json();
}

export function useOrigin() {
    return useQuery({
        queryKey: ['origin-dnd'],
        queryFn: fetchOrigin,
    })
}