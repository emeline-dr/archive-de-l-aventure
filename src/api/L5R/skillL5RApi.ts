import { useQuery } from "@tanstack/react-query";

export type SkillL5R = {
    id: number;
    label: string;
    proficient: boolean;
    categories: string;
    system_id: number;
};

export async function fetchSkillL5R(): Promise<SkillL5R[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/skill/system/1');

    if (!res.ok) {
        throw new Error('Échec du chargement des compétences de L5R');
    }

    return res.json();
}

export function useSkillL5RFiltered() {
    return useQuery({
        queryKey: ['skills-l5r'],
        queryFn: fetchSkillL5R
    });
}