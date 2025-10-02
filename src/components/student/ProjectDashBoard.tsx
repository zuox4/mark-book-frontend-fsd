import photo from "../../app/assets/imageMedia.svg";

import TeacherProfile from "./TeacherProfile";
import TeachersProfileMobile from "./TeachersProfileMobile";
import MarkBookButton from "./MarkBookButton";

const ProjectDashBoard = () => {
  return (
    <div className="p-4  lg:p-6">
      {/* Название и фото проектного оффиса */}
      <div className="flex flex-col lg:flex-col gap-6 lg:gap-8">
        {/* Блок с фото - всегда сверху */}
        <div className="w-full flex justify-between">
          <div className="w-full max-w-xs lg:max-w-full lg:w-1/4">
            <img
              src={photo}
              alt="Инженерный класс"
              className="w-full h-auto rounded-2xl lg:rounded-3xl"
            />
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
              <span className="text-sch-green-light">
                Найдюк Кирилл Константинович
              </span>
              <br className="" /> в Инженерный класс в московской школе
            </h1>
            <div className="lg:hidden gap-3 flex flex-col">
              <TeachersProfileMobile />
              <MarkBookButton />
            </div>

            {/* Белый текст описания */}
            <p className="font-codec-news text-[15px] lg:text-xl xl:text-lg leading-relaxed text-justify text-white">
              Два года обучения — возможность для ребят научиться навыкам,
              применимым в реальном медиа-бизнесе сегодня. Мы готовим ребят,
              способных ориентироваться в трендах развития отрасли, умеющих
              анализировать инфополе и предлагать креативные решения, отвечающие
              задачам маркетинга. Медиакласс — это про практику, подкрепленную
              основами теоретической базы. Это про общение с экспертами отрасли
              и про навыки, применимые здесь и сейчас.
            </p>
          </div>
          {/* Десктопная версия */}
          <div className="hidden lg:block py-6 mt-7">
            <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto">
              <TeacherProfile />
              <TeacherProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashBoard;
