import { api } from "@/lib/axios";
import { Report } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

// Get reports by locale
export const useReports = (locale: string = "ua") => {
  return useQuery({
    queryKey: [`reports-${locale}`],
    queryFn: async (): Promise<Report[]> => {
      const response = await api.get("/reports", {
        params: { locale },
      });
      return response.data;
    },
  });
};
