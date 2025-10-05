import { privateApi } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";

interface ApiProjectOffice {
  title: string;
  description: string;
  logo_url: string;
}
const getProjectData = async (): Promise<ApiProjectOffice> => {
  const res = await privateApi.get<ApiProjectOffice>("/student/project_office");
  return res.data;
};
// # получаем проект
export const useProjectData = () => {
  return useQuery<ApiProjectOffice>({
    queryKey: ["projectOffice"],
    queryFn: getProjectData,
    staleTime: 10 * 60 * 1000, // 10 минут - данные считаются свежими
  });
};
