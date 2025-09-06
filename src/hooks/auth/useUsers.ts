import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { User } from "@/lib/types";

// Get users hook (admin only)
export const useUsers = () => {
  return useQuery({
    queryKey: ["auth-users"],
    queryFn: async (): Promise<User[]> => {
      const response = await api.get("/auth/users");
      return response.data;
    },
  });
};
