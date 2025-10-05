import api from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";

interface ApiStudentData {
  display_name: string;
  class_name: string;
  project_office_id: number | null;
}
// # получаем первоначальные данные ученика
export const useStudentData = () => {
  return useQuery<ApiStudentData>({
    queryKey: ["student"],
    queryFn: async () => {
      const response = await api.get<ApiStudentData>("/student");
      return response.data; // возвращаем сразу data, а не весь response
    },
    staleTime: 10 * 60 * 1000, // 10 минут - данные считаются свежими
  });
};
