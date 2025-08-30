import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Report, ApiResponse } from "@/lib/types";

// Get reports by locale
export const useReports = (locale: string = "ua") => {
  return useQuery({
    queryKey: [`reports-${locale}`],
    queryFn: async (): Promise<ApiResponse<Report[]>> => {
      const response = await api.get("/reports", {
        params: { locale },
      });
      return response.data;
    },
    select: data => data.data,
  });
};
