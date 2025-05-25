import { useQuery } from "@tanstack/react-query";

export type User = {
    id: number;
    username: string;
    password: string;
    email: string;
    roles_id: number[];
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
    });
}

export async function fetchUserById(userId: number): Promise<User> {
    const res = await fetch(`https://apidnd.up.railway.app/api/users/${userId}`);

    if (!res.ok) {
        throw new Error('Utilisateur non trouvé');
    }

    return res.json();
}


export const useUserById = (userId: number) => {
    return useQuery({
        queryKey: ['user-by-id', userId],
        queryFn: () => fetchUserById(userId),
        enabled: !!userId,
    });
};