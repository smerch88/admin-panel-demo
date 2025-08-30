import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreateReportRequest, Report, ApiResponse } from "@/lib/types";

// Create report
export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      reportData: CreateReportRequest
    ): Promise<ApiResponse<Report>> => {
      const response = await api.post("/reports", reportData);
      return response.data;
    },
    onSuccess: data => {
      // Invalidate reports list for the specific language
      queryClient.invalidateQueries({
        queryKey: [`reports-${data.data.language}`],
      });
    },
  });
};
