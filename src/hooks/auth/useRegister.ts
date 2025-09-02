import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { RegisterRequest, RegisterResponse, ApiResponse } from "@/lib/types";

// Register hook
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      userData: RegisterRequest
    ): Promise<ApiResponse<RegisterResponse>> => {
      const response = await api.post("/auth/register", userData);
      return response.data;
    },
    onSuccess: data => {
      // Token is automatically stored in httpOnly cookies by the server
      // Store user data in localStorage for client-side access
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      // Redirect to dashboard after successful registration
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    },
  });
};
