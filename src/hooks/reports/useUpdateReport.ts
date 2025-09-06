import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UpdateReportRequest, Report, ApiResponse } from "@/lib/types";

// Update report
export const useUpdateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      reportData,
    }: {
      id: string;
      reportData: UpdateReportRequest;
    }): Promise<Report> => {
      const response = await api.patch(`/reports/${id}`, reportData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update report in cache
      queryClient.setQueryData([`reports-${variables.id}`], data);
      // Invalidate reports list for the specific language
      queryClient.invalidateQueries({
        queryKey: [`reports-${data.language}`],
      });
    },
  });
};
