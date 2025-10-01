import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TeacherProfile = () => {
  return (
    <div className="flex flex-col gap-3 border-1 relative bg-sch-blue-dark/40 p-4 lg:flex-row lg:p-10 rounded-2xl lg:bg-sch-blue-dark/10">
      <div className="flex justify-center  lg:absolute -right-3 -top-10">
        <Avatar
          className={`rounded-lg w-full  max-w-[200px] h-[200px] lg:w-30 lg:h-30 lg:ring-4  lg:rounded-full flex-shrink-0`}
        >
          <AvatarImage
            src="https://sch1298sz.mskobr.ru/attach_files/photo_new/photo_7ce6ea016a26fe34eb6a0adb1d2138a9_683fe243729e1.jpeg"
            alt="@evilrabbit"
            className="object-cover w-full h-full"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col font-codec gap-2">
        <span className="text-[14px] uppercase border-b-2 border-sch-green-light w-fit lg:text-lg font-codec-bold">
          Руководитель проекта
        </span>
        <span className="text-[17px] mt-2 w-fit  ">
          Денисов Станислав Андреевич
        </span>

        <span
          className={`font-codec-news text-justify text-[14px] lg:text-[16px] uppercase`}
        >
          Личный результат ЕГЭ: - экспертный уровень - 100 баллов по литературе
          - 100 баллов по русскому языку Наставник - стобалльников ЕГЭ по
          литературе 2024, 2023 - стобалльников ЕГЭ по русскому языку 2024, 2023
          - призеров регионального этапа ВсОШ по литературе Руководитель
          школьной газеты 1298 WEEKLY
        </span>
      </div>
    </div>
  );
};

export default TeacherProfile;
