import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse, ApiResponse } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

// Login hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (
      credentials: LoginRequest
    ): Promise<ApiResponse<LoginResponse>> => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: data => {
      // Token is automatically stored in httpOnly cookies by the server
      // Update auth context with user data
      login(data.data.user);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};
