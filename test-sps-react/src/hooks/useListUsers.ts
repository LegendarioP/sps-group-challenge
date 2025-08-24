import { useEffect, useState } from "react";
import userService from "../services/UserService.ts";
import { User } from "../types/user.ts";

export const useListUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response: User[] = await userService.list();
            setUsers(response);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
            setError("Erro ao carregar usuários");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const refetch = () => {
        fetchUsers();
    };

    return { users, loading, error, refetch };
};