import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface TeacherProfileProps {
  displayName: string;
  about?: string;
  image?: string;
  variant: "group_leader" | "project_leader";
}
const TeacherProfile = ({
  displayName,
  about,
  image,
  variant,
}: TeacherProfileProps) => {
  const shortName = displayName
    .split(" ")
    .map((c) => c.charAt(0))
    .join("");
  return (
    <div className="flex flex-col gap-3 border-1 relative bg-sch-blue-dark/40 p-4 lg:flex-row lg:p-10 rounded-2xl lg:bg-sch-blue-dark/10">
      <div className="flex justify-center lg:absolute -right-3 -top-10">
        <Avatar
          className={`rounded-lg w-full  max-w-[200px] h-[200px] lg:w-30 lg:h-30 lg:ring-4  lg:rounded-full flex-shrink-0`}
        >
          <AvatarImage
            src={image}
            alt="@evilrabbit"
            className="object-cover w-full h-full"
          />
          <AvatarFallback className="bg-gray-700">{shortName}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col font-codec gap-2">
        <span className="text-[14px] uppercase border-b-2 border-sch-green-light w-fit lg:text-lg font-codec-bold">
          {variant === "project_leader"
            ? "Руководитель проекта"
            : "Классный руководитель"}
        </span>
        <span className="text-[17px] mt-2 w-fit  ">{displayName}</span>

        <span
          className={`font-codec-news text-justify w-fit text-[14px] lg:text-[16px] uppercase`}
        >
          {about ? about : "Информация о пользователе не предоставлена"}
        </span>
      </div>
    </div>
  );
};

export default TeacherProfile;
