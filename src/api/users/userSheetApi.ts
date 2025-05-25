import { useQuery } from "@tanstack/react-query";

export type SheetByUser = {
    id: number;
    user_id: number;
    system_id: number;
    lastname: string;
    firstname: string;
    avatar_src: string;
    shared: boolean;
    lvl: number;
};

export async function fetchSheets(): Promise<SheetByUser[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/sheet');

    if (!res.ok) {
        throw new Error('Échec du chargement des fiches');
    }

    return res.json();
}

export function useSheetsForAllUsers() {
    return useQuery({
        queryKey: ['sheets-for-all-users'],
        queryFn: fetchSheets,
    })
}

export async function fetchSheetsShared(): Promise<SheetByUser[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/sheet/shared');

    if (!res.ok) {
        throw new Error('Échec du chargement des fiches partagées');
    }

    return res.json();
}

export function useSheetsShared() {
    return useQuery({
        queryKey: ['sheets-shared-for-all-users'],
        queryFn: fetchSheetsShared,
    })
}


export async function fetchSheetsByUsers(user_id: number): Promise<SheetByUser[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/sheet/user/' + user_id);

    if (!res.ok) {
        throw new Error('Échec du chargement des fiches par utilisateur');
    }

    return res.json();
}

export function useSheetsByUsers(user_id: number) {
    return useQuery({
        queryKey: ['sheets-by-users', user_id],
        queryFn: () => fetchSheetsByUsers(user_id),
        enabled: !!user_id,
    });
}