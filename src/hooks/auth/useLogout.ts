import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// Logout hook
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      // Clear any stored user data
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        // Redirect to login page
        window.location.href = "/login";
      }
    },
    onError: (error: unknown) => {
      console.error("Logout error:", error);
      // Even if logout fails, clear local data and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    },
  });
};
