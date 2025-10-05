import Header from "@/components/owner/header/Header";

import { Outlet } from "react-router-dom";

// Реализовать загрузку данных пользователя необходимых для дальнейшего использования на страницах

const StudentPage = () => {
  // const { logout } = useAuthStore();
  // const { data } = useStudentData();

  return (
    <div className="min-h-screen px-3 pt-25  xl:px-70 pb-10">
      <Header />
      <Outlet />
    </div>
  );
};

export default StudentPage;
