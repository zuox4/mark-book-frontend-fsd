import Loader from "@/components/owner/Loader";
import ProjectDashBoard from "@/components/student/ProjectDashBoard";
import { useAuth } from "@/hooks/auth";
import { useProjectData } from "@/hooks/student/useProjectData";

const ProjectOfficePage = () => {
  const { data, error, isLoading } = useProjectData();
  const { logout } = useAuth();
  if (isLoading) return <Loader />;
  if (error) {
    logout();
  }
  return (
    <div className="text-white">
      <ProjectDashBoard
        title={data?.title}
        description={data?.description}
        logo_url={data?.logo_url}
      />
    </div>
  );
};

export default ProjectOfficePage;
