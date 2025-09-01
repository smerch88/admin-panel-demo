import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// Delete user hook
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string): Promise<void> => {
      await api.delete(`/auth/users/${userId}`);
      // Delete returns 204 No Content, no response body
    },
    onSuccess: (_, userId) => {
      // Remove user from cache
      queryClient.removeQueries({ queryKey: [`auth-user-${userId}`] });
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ["auth-users"] });
    },
  });
};
