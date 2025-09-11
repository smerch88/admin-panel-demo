import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { User } from "@/lib/types";
import { userStorage } from "@/lib/storage";

// Hook to manually fetch current user data and store in localStorage
export const useFetchCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<User> => {
      const response = await api.get("/auth/users/current");
      return response.data;
    },
    onSuccess: (userData: User) => {
      // Store user data in localStorage
      userStorage.setUser(userData);
      // Invalidate and refetch current user query
      queryClient.invalidateQueries({ queryKey: ["auth-current-user"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user-local"] });

      // Set the data in the query cache for immediate access
      queryClient.setQueryData(["auth-current-user"], userData);
      queryClient.setQueryData(["auth-user-local"], userData);
    },
    onError: (error: unknown) => {
      throw error;
    },
  });
};

// Hook to fetch current user and return the mutation
export const useRefreshCurrentUser = () => {
  const fetchCurrentUserMutation = useFetchCurrentUser();

  const refreshUser = async () => {
    try {
      const userData = await fetchCurrentUserMutation.mutateAsync();
      return userData;
    } catch (error) {
      throw error;
    }
  };

  return {
    refreshUser,
    isLoading: fetchCurrentUserMutation.isPending,
    error: fetchCurrentUserMutation.error,
    isSuccess: fetchCurrentUserMutation.isSuccess,
  };
};
