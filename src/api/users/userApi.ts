import { useQuery } from "@tanstack/react-query";

export type User = {
    id: number;
    username: string;
};

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch('https://apidnd.up.railway.app/api/users');

    if (!res.ok) {
        throw new Error('Échec du chargement des utilisateurs');
    }

    return res.json();
}

export function useUser() {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5,
    });
}