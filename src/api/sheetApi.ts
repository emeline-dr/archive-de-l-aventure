import { useQuery } from "@tanstack/react-query";

export type Sheet = {
    id: number;
    user_id: number;
    system_id: number;
    lastname: string | null;
    firstname: string;
    avatar_src: string;
};

export async function fetchSheets(): Promise<Sheet[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/sheet');

    if (!res.ok) {
        throw new Error('Échec du chargement des fiches');
    }

    return res.json();
}

export function useSheets() {
    return useQuery({
        queryKey: ['sheets'],
        queryFn: fetchSheets,
    });
}