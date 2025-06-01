import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type Class = {
    id: number;
    label: string;
};

export type SubClass = {
    id: number;
    label: string;
    classe_dnd_id: number;
};

/* Appel des classes */
export async function fetchClass(): Promise<Class[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/classeDnD');

    if (!res.ok) {
        throw new Error('Échec du chargement des classes');
    }

    return res.json();
}

export function useClass() {
    return useQuery({
        queryKey: ['class-dnd'],
        queryFn: fetchClass,
    });
}

/* Appel des sous-classes */
export async function fetchSubClass(): Promise<SubClass[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/subClasseDnD');

    if (!res.ok) {
        throw new Error('Échec du chargement des sous-classes');
    }

    return res.json();
}

export function useSubClass() {
    return useQuery({
        queryKey: ['subclass-dnd'],
        queryFn: fetchSubClass,
    })
}