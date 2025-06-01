import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type Language = {
    id: number;
    label: string;
    language_id: number;
};

export async function fetchLanguage(): Promise<Language[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/language');

    if (!res.ok) {
        throw new Error('Échec du chargement des langues');
    }

    return res.json();
}

export function useLanguage() {
    return useQuery({
        queryKey: ['language-dnd'],
        queryFn: fetchLanguage,
    });
}