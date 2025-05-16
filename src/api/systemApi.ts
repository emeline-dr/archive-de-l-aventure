import { useQuery } from "@tanstack/react-query";

export type System = {
    id: number;
    label: string;
};

export async function fetchSystems(): Promise<System[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/system');

    if (!res.ok) {
        throw new Error('Échec du chargement des systèmes');
    }

    return res.json();
}

export function useSystems() {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchSystems,
    });
}