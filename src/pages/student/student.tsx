import Header from "@/components/owner/header/Header";
import { Link, Outlet } from "react-router-dom";
// Реализовать загрузку данных пользователя необходимых для дальнейшего использования на страницах
const Student = () => {
  return (
    <div className="min-h-screen pt-20">
      <Header />
      <nav>
        <Link to={"events"}>Мероприятия</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Student;
