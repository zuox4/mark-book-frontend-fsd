import Header from "@/components/owner/header/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useNavigate } from "react-router-dom";

const TeacherPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Button onClick={handleLogOut}>Выйти</Button>
    </div>
  );
};

export default TeacherPage;
