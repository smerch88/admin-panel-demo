import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

// Logout hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await api.post("/auth/logout");
      // Logout returns 204 No Content, no response body
    },
    onSuccess: () => {
      // Token is automatically cleared from httpOnly cookies by the server
      // Update auth context
      logout();
      // Clear all queries
      queryClient.clear();
    },
  });
};
