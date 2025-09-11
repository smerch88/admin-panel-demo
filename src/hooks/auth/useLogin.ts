import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse, ApiResponse } from "@/lib/types";
import { useFetchCurrentUser } from "./useFetchCurrentUser";

// Login hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  const fetchCurrentUserMutation = useFetchCurrentUser();

  return useMutation({
    mutationFn: async (
      credentials: LoginRequest
    ): Promise<ApiResponse<LoginResponse>> => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: async () => {
      try {
        // Fetch current user data and store in localStorage using the hook
        await fetchCurrentUserMutation.mutateAsync();

        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ["auth"] });

        // Note: Navigation is now handled by the LoginForm component
        // to avoid chunk loading issues with window.location.href
      } catch (error) {
        throw error;
        // Navigation will still be handled by LoginForm component
      }
    },
    onError: (error: unknown) => {
      throw error;
    },
  });
};
