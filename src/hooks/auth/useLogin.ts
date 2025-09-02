import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse, ApiResponse } from "@/lib/types";

// Login hook
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      credentials: LoginRequest
    ): Promise<ApiResponse<LoginResponse>> => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch user data if needed
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      // Redirect to dashboard after successful login
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    },
    onError: (error: unknown) => {
      console.error("Login error:", error);
    },
  });
};
