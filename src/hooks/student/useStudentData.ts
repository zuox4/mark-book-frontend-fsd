import api from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
// # получаем первоначальные данные ученика
export const useStudentData = () => {
  return useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const response = await api.get("/student");
      return response.data; // возвращаем сразу data, а не весь response
    },
  });
};
