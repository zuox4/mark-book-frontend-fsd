// components/class-teacher/ClassTeacherDashboard.tsx
import { StageInfo } from "@/hooks/teacher/journal/types";
import { useClassTeacherJournal } from "@/hooks/teacher/journal/useClassTeacherJournal";
import { useEventsForClassTeacher } from "@/hooks/teacher/useClassTeacherEvents";
import { useClassTeacherGroups } from "@/hooks/teacher/useClassTeacherGroups";
import React from "react";
import EventsListFilter from "../event-leader/EventsListFilter";
import GroupListFilter from "../event-leader/GroupListFilter";
import EventStats from "./EventStats";
import ReadOnlyStudentRow from "./ReadOnlyStudentRow";

const ClassTeacherDashboard = () => {
  const [eventId, setEventId] = React.useState<number | null>(null);
  const [groupId, setGroupId] = React.useState<number | null>(null);

  // Здесь должны быть хуки для получения мероприятий и классов доступных классному руководителю
  const { data: events = [] } = useEventsForClassTeacher(); // Нужно создать этот хук
  const { data: groups = [] } = useClassTeacherGroups(); // Нужно создать этот хук

  const {
    data: journalData,
    isLoading,
    error,
  } = useClassTeacherJournal(eventId, groupId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-8">
        Ошибка загрузки данных: {error.message}
      </div>
    );
  }

  // Получаем все уникальные стадии из данных
  const allStages =
    journalData?.reduce((stages: StageInfo[], student) => {
      student.stages?.forEach((stage) => {
        if (!stages.find((s) => s.name === stage.name)) {
          stages.push({
            name: stage.name,
            stage_id: stage.stage_id,
            min_required_score: stage.min_required_score,
          });
        }
      });
      return stages;
    }, []) || [];

  return (
    <div className="p-6 text-white font-codec-news">
      <h1 className="text-2xl font-bold mb-6">
        Журнал мероприятий - Классный руководитель
      </h1>

      {/* Фильтры */}
      <div className="space-y-6 mb-6">
        <GroupListFilter
          groups={groups}
          selectedGroupId={groupId}
          setGroupId={setGroupId}
        />
        <EventsListFilter
          events={events}
          selectedEventId={eventId}
          setEventId={setEventId}
        />
      </div>

      {/* Статистика мероприятия */}
      {journalData && journalData.length > 0 && (
        <EventStats journalData={journalData} />
      )}

      {/* Таблица с результатами */}
      <div className="mt-8">
        {eventId && groupId && journalData && journalData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-gray-600 sticky left-0 bg-gray-700 z-10">
                    Ученик
                  </th>
                  {allStages.map((stage) => (
                    <th
                      key={stage.name}
                      className="px-4 py-3 text-center text-sm font-medium text-white border-r border-gray-600 min-w-[150px]"
                    >
                      <div>{stage.name}</div>
                      <div className="text-xs text-gray-300 font-normal">
                        мин. {stage.min_required_score} баллов
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-sm font-medium text-white sticky right-0 bg-gray-700">
                    <div>Общий балл</div>
                    <div className="text-xs text-gray-300 font-normal">
                      стадии
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {journalData.map((student, studentIndex) => (
                  <ReadOnlyStudentRow
                    key={student.id}
                    student={student}
                    studentIndex={studentIndex}
                    allStages={allStages}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            {eventId && groupId
              ? "Нет данных для отображения"
              : "Выберите класс и мероприятие"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassTeacherDashboard;
