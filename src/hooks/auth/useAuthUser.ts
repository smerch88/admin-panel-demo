import { useQuery } from "@tanstack/react-query";
import { userStorage } from "@/lib/storage";
import { User } from "@/lib/types";

// Hook to get current user from localStorage
export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user-local"],
    queryFn: (): User | null => {
      return userStorage.getUser();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to check if user is authenticated
export const useIsAuthenticated = () => {
  const { data: user } = useAuthUser();
  return !!user;
};
