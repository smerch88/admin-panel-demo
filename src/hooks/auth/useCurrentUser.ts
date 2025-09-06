import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { User, ApiResponse } from "@/lib/types";

// Get current user hook
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["auth-current-user"],
    queryFn: async (): Promise<ApiResponse<User>> => {
      const response = await api.get("/auth/users/current");
      return response.data;
    },
    select: data => data.data,
  });
};
