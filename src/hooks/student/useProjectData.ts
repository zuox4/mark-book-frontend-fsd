import api from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
// # получаем проект
export const useProjectData = (id: number) => {
  return useQuery({
    queryKey: ["projectOffice", [id]],
    queryFn: async () => {
      const response = await api.get(`/project/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
