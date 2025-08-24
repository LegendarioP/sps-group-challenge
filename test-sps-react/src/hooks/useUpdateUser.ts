import { useState } from "react";
import userService from "../services/UserService.ts";
import { User } from "../types/user.ts";

export const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
        try {
            setLoading(true);
            setError(null);
            const updatedUser = await userService.update(id, userData);
            return updatedUser;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            setError("Erro ao atualizar usuário");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { updateUser, loading, error };
};
