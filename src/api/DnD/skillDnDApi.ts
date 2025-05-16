import { useQuery } from "@tanstack/react-query";

export type SkillDnD = {
    id: number;
    label: string;
    system_id: number;
};

export async function fetchSkillDnD(): Promise<SkillDnD[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/skill');

    if (!res.ok) {
        throw new Error('Échec du chargement des compétences de DnD');
    }

    return res.json();
}

export function useSkillDnDFiltered() {
    return useQuery({
        queryKey: ['skills-dnd'],
        queryFn: fetchSkillDnD,
        select: (data) => data.filter(skill => skill.system_id === 2),
    });
}