import BackButton from "@/components/student/markbook/BackButton";
import MarkList from "@/components/student/markbook/MarkList";
import PageHeader from "@/components/student/markbook/PageHeader";
import Statistics from "@/components/student/markbook/Statistics";
import { useState } from "react";
export interface Stage {
  name: string;
  score: number;
  maxScore: number;
  status: "зачет" | "незачет";
  date: string;
}

export interface Mark {
  id: number;
  eventName: string;
  type: "зачет" | "незачет";
  date: string;
  stages: Stage[];
}

// Mock данные
const mockMarks: Mark[] = [
  {
    id: 1,
    eventName: "ВСОШ по литературе",
    type: "зачет",
    date: "2024-01-15",
    stages: [
      {
        name: "Школьный этап",
        score: 28,
        maxScore: 30,
        status: "зачет",
        date: "2024-09-15",
      },
      {
        name: "Муниципальный этап",
        score: 25,
        maxScore: 30,
        status: "зачет",
        date: "2024-10-20",
      },
      {
        name: "Региональный этап",
        score: 22,
        maxScore: 30,
        status: "незачет",
        date: "2024-11-25",
      },
    ],
  },
  {
    id: 2,
    eventName: "Хакатон по веб-разработке",
    type: "зачет",
    date: "2024-02-20",
    stages: [
      {
        name: "Отборочный тур",
        score: 45,
        maxScore: 50,
        status: "зачет",
        date: "2024-01-10",
      },
      {
        name: "Финальный этап",
        score: 85,
        maxScore: 100,
        status: "зачет",
        date: "2024-02-20",
      },
    ],
  },
  {
    id: 3,
    eventName: "Научная конференция",
    type: "незачет",
    date: "2024-03-10",
    stages: [
      {
        name: "Подготовка работы",
        score: 15,
        maxScore: 20,
        status: "зачет",
        date: "2024-02-28",
      },
      {
        name: "Защита проекта",
        score: 12,
        maxScore: 20,
        status: "незачет",
        date: "2024-03-10",
      },
    ],
  },
];
// Главный компонент страницы
function MarkBookPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col">
        <BackButton path="/student" title="К проектному оффису" />
        <PageHeader
          projectTitle="Инженерный класс в Московской школе"
          displayName="Найдюк Кирилл Константинович"
          groupName="11-И"
        />
        <Statistics marks={mockMarks} />
        <MarkList
          marks={mockMarks}
          expandedCard={expandedCard}
          onToggleCard={toggleCard}
        />
      </div>
    </div>
  );
}

export default MarkBookPage;
