import Header from "@/components/owner/header/Header";
import { Outlet } from "react-router-dom";
// Реализовать загрузку данных пользователя необходимых для дальнейшего использования на страницах
const Student = () => {
  return (
    <div className="min-h-screen px-3 pt-25  xl:px-70 pb-10">
      <Header />
      <div className=""></div>
      <Outlet></Outlet>
    </div>
  );
};

export default Student;
