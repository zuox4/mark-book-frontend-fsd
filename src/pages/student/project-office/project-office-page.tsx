import Loader from "@/components/owner/Loader";
import NotFoundInfo from "@/components/owner/NotFoundInfo";
import ProjectDashBoard from "@/components/student/project-office/ProjectDashBoard";
// import { useAuth } from "@/hooks/auth";
import { useProjectData } from "@/hooks/student/useProjectData";

const ProjectOfficePage = () => {
  const { data, isLoading } = useProjectData();

  if (isLoading) return <Loader />;
  if (!data) return <NotFoundInfo />;
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
