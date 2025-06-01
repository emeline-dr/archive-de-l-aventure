import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type SkillCoC = {
    id: number;
    label: string;
    system_id: number;
};

export async function fetchSkillCoC(): Promise<SkillCoC[]> {
    const res = await fetchWithAuth('https://apidnd.up.railway.app/api/skill/system/3');

    if (!res.ok) {
        throw new Error('Échec du chargement des compétences de CoC');
    }

    return res.json();
}

export function useSkillCoCFiltered() {
    return useQuery({
        queryKey: ['skills-coc'],
        queryFn: fetchSkillCoC
    });
}