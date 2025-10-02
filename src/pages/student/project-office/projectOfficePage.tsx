import ProjectDashBoard from "@/components/student/ProjectDashBoard";
import { useStudentData } from "@/hooks/student/useStudentData";
import { Loader } from "lucide-react";

const ProjectOfficePage = () => {
  const { data: studentData, isLoading: isStudentLoading } = useStudentData();
  if (isStudentLoading) return <Loader />;
  return (
    <div className="text-white">
      {studentData.project_id === 2 ? (
        <ProjectDashBoard
          displayName={studentData.display_name}
          projectOfficeId={studentData.project_id}
        />
      ) : (
        <h1>Вы не учавствуете в проектах</h1>
      )}
    </div>
  );
};

export default ProjectOfficePage;
