import Header from "@/components/owner/header/Header";
import { useAuth } from "@/hooks/auth";

const TeacherPage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen pt-25">
      <Header />
      <h1 className="font-codec text-2xl text-center text-white">
        Здравствуйте,
        <br />
        {user?.display_name}
      </h1>
      <h1 className="font-codec text-2xl text-center text-white">
        Рабочее пространство сотрудника школы
      </h1>
      <h1 className="font-codec text-2xl text-center text-white">
        В разработке...
      </h1>
    </div>
  );
};

export default TeacherPage;
