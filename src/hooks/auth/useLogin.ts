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

        // Redirect to dashboard after successful login
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Error fetching current user after login:", error);
        // Still redirect even if fetching user data fails
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard";
        }
      }
    },
    onError: (error: unknown) => {
      console.error("Login error:", error);
    },
  });
};
