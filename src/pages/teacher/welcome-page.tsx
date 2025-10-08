import { teacherNavItems } from "@/config/teacherNavigation";
import { useAuth } from "@/hooks/auth";
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto space-y-8 font-codec-news">
      {/* Заголовок */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2 uppercase">
          {user?.display_name}
        </h1>
        <p className="text-xl text-sch-green-light">
          Добро пожаловать в систему учета достижений
        </p>
      </div>
      {/* Основная информация о системе */}
      <div className="rounded-2xl">
        <h2 className="text-xl font-semibold uppercase text-white mb-6">
          О платформе
        </h2>

        <div className="prose prose-lg max-w-none text-white uppercase space-y-4">
          <p className="text-lg leading-relaxed">
            Это приложение предназначено для администрирования результатами
            учеников в мероприятиях{" "}
            <strong className="text-sch-green-light">
              Школы 1298 «Профиль Куркино»
            </strong>
            . Платформа обеспечивает комплексный учет и мониторинг
            образовательных достижений.
          </p>
        </div>
      </div>
      {/* Быстрая навигация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teacherNavItems.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.to)}
            className={`
              p-6 rounded-xl border-2 cursor-pointer
              transition-all duration-300 transform hover:scale-105 hover:bg-sch-blue-ultra/50
              hover:shadow-lg backdrop-blur-sm
               border-sch-green-light
              group
            `}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className={`text-lg font-bold mb-1 text-white`}>
                {card.label}
              </h3>
              <p className="text-white text-sm opacity-80">
                {card.description}
              </p>
              <div className="mt-3 text-white text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                Нажмите для перехода
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Описание */}
    </div>
  );
};

export default WelcomePage;
