import { useQuery } from "@tanstack/react-query";

export type School = {
    id: number;
    label: string;
};

export async function fetchSchool(): Promise<School[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/schoolL5R');

    if (!res.ok) {
        throw new Error('Échec du chargement des écoles');
    }

    return res.json();
}

export function useSchool() {
    return useQuery({
        queryKey: ['school-l5r'],
        queryFn: fetchSchool,
        staleTime: 1000 * 60 * 5,
    });
}