import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { clearAuthData } from "@/lib/storage";

// Logout hook
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      // Clear all auth data from localStorage
      clearAuthData();

      // Invalidate all auth-related queries
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["auth-current-user"] });

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
    onError: (error: unknown) => {
      console.error("Logout error:", error);
      // Even if logout fails, clear local data and redirect
      clearAuthData();
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["auth-current-user"] });

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  });
};
