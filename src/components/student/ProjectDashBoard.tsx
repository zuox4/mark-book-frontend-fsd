import { useProjectData } from "@/hooks/student/useProjectData";

import { Loader } from "lucide-react";
import MarkBookButton from "./MarkBookButton";
import TeacherProfile from "./TeacherProfile";
import TeachersProfileMobile from "./TeachersProfileMobile";
interface ProjectDashBoardProps {
  projectOfficeId: number;
  displayName: string;
}
const ProjectDashBoard = ({
  projectOfficeId,
  displayName,
}: ProjectDashBoardProps) => {
  const { data, isLoading } = useProjectData(projectOfficeId);

  if (isLoading) return <Loader />;

  const { title, description, logo_url, leader_info } = data;

  return (
    <div className="p-4  lg:p-6">
      {/* Название и фото проектного оффиса */}
      <div className="flex flex-col lg:flex-col gap-6 lg:gap-8">
        {/* Блок с фото - всегда сверху */}
        <div className="w-full flex justify-between">
          <div className="w-full max-w-xs lg:max-w-full lg:w-1/4">
            {
              <img
                src={
                  logo_url
                    ? logo_url
                    : "https://sch1298sz.mskobr.ru/attach_files/logo/site1.png"
                }
                alt="Инженерный класс"
                className="w-full h-30 object-cover  rounded-2xl lg:rounded-3xl"
              />
            }
          </div>
          {/* Кнопка открыть зачетную книжку */}
          <div className="hidden lg:block">
            <MarkBookButton />
          </div>
        </div>

        {/* Основной контент */}
        <div className="lg:flex-1 lg:flex lg:flex-col">
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Белый заголовок */}
            <h1 className="uppercase text-[15px] lg:text-xl xl:text-4xl font-bold text-white leading-tight">
              Добро пожаловать,{" "}
              <span className="text-sch-green-light">{displayName}</span>
              <br className="" /> в {title}
            </h1>
            <div className="lg:hidden gap-3 flex flex-col">
              <TeachersProfileMobile
                teachers={[
                  <TeacherProfile
                    displayName={leader_info.display_name}
                    image={leader_info.image}
                    variant="project_leader"
                    about={"leader_info.about"}
                  />,
                  <TeacherProfile
                    displayName={leader_info.display_name}
                    image={leader_info.image}
                    variant="group_leader"
                    about={"leader_info.about"}
                  />,
                ]}
              />
              <MarkBookButton />
            </div>

            {/* Белый текст описания */}
            <p className="font-codec-news text-[15px] lg:text-xl xl:text-lg leading-relaxed text-justify text-white">
              {description}
            </p>
          </div>
          {/* Десктопная версия */}
          <div className="hidden lg:block py-6 mt-7">
            <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto">
              <TeacherProfile
                displayName={leader_info.display_name}
                image={leader_info.image}
                variant="project_leader"
                about={"leader_info.about"}
              />
              <TeacherProfile
                displayName={leader_info.display_name}
                image={leader_info.image}
                variant="group_leader"
                about={"leader_info.about"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashBoard;
