import { useQuery } from "@tanstack/react-query";

export type SkillCoC = {
    id: number;
    label: string;
    systemId: number;
};

export async function fetchSkillCoC(): Promise<SkillCoC[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/skill');

    if (!res.ok) {
        throw new Error('Échec du chargement des compétences de CoC');
    }

    return res.json();
}

export function useSkillCoCFiltered() {
    return useQuery({
        queryKey: ['skills-coc'],
        queryFn: fetchSkillCoC,
        select: (data) => data.filter(skill => skill.systemId === 3),
    });
}