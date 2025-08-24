import { useListUsers } from "./useListUsers.ts";
import { useUpdateUser } from "./useUpdateUser.ts";
import { useDeleteUser } from "./useDeleteUser.ts";

export const useUserManagement = () => {
  const { users, loading: listLoading, error: listError, refetch } = useListUsers();
  const { updateUser, loading: updateLoading, error: updateError } = useUpdateUser();
  const { deleteUser, loading: deleteLoading, error: deleteError } = useDeleteUser();

  const loading = listLoading || updateLoading || deleteLoading;
  const error = listError || updateError || deleteError;

  const handleUpdate = async (id: string, userData: any) => {
    const result = await updateUser(id, userData);
    if (result) {
      refetch();
    }
    return result;
  };

  const handleDelete = async (id: string) => {
    const result = await deleteUser(id);
    if (result) {
      refetch();
    }
    return result;
  };

  return {
    users,
    loading,
    error,
    refetch,
    updateUser: handleUpdate,
    deleteUser: handleDelete,
  };
};
