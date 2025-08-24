import { useState } from "react";
import userService from "../services/UserService.ts";

export const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteUser = async (id: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await userService.delete(id);
            return true;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            setError("Erro ao deletar usuário");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteUser, loading, error };
};
