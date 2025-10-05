import Loader from "@/components/owner/Loader";
import NotFoundInfo from "@/components/owner/NotFoundInfo";
import BackButton from "@/components/student/markbook/BackButton";
import MarkList from "@/components/student/markbook/MarkList";
import PageHeader from "@/components/student/markbook/PageHeader";
import Statistics from "@/components/student/markbook/Statistics";
import { useMarkBookData } from "@/hooks/student/useMarkBook";
import { useStudentData } from "@/hooks/student/useStudentData";
import { useState } from "react";

// Главный компонент страницы
function MarkBookPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { data: marks, isLoading } = useMarkBookData();
  const { data: userData } = useStudentData();
  if (isLoading) return <Loader />;
  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  if (!userData?.project_office_id) return <NotFoundInfo />;
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col">
        <BackButton path="/student" title="К проектному оффису" />
        {userData && (
          <PageHeader
            projectTitle="Инженерный класс в Московской школе"
            displayName="Найдюк Кирилл Константинович"
            groupName={userData?.class_name}
          />
        )}

        {marks && (
          <>
            <Statistics marks={marks.marks} />
            <MarkList
              marks={marks.marks}
              expandedCard={expandedCard}
              onToggleCard={toggleCard}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default MarkBookPage;
