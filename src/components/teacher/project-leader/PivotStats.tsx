// components/project-office/PivotStats.tsx
import { PivotStudent } from "@/hooks/teacher/useProjectOfficePivot";
import React from "react";

interface PivotStatsProps {
  students: PivotStudent[];
}

const PivotStats: React.FC<PivotStatsProps> = ({ students }) => {
  if (!students || students.length === 0) return null;

  // Собираем статистику из сводных данных
  const totalStudents = students.length;

  // Группируем по классам
  const groups = Array.from(
    new Set(students.map((student) => student.group_name))
  ).filter(Boolean);

  // Собираем статистику по мероприятиям
  const allEvents = students.length > 0 ? Object.keys(students[0].events) : [];

  // Общая статистика по всем мероприятиям
  let totalCompletedEvents = 0;
  let totalEvents = 0;
  let totalScore = 0;

  students.forEach((student) => {
    Object.values(student.events).forEach((event) => {
      totalEvents++;
      totalScore += event.total_score;
      if (event.status === "зачет") {
        totalCompletedEvents++;
      }
    });
  });

  const averageScore = totalEvents > 0 ? totalScore / totalEvents : 0;
  const completionRate =
    totalEvents > 0 ? (totalCompletedEvents / totalEvents) * 100 : 0;

  // Статистика по классам
  const groupStats = groups.map((groupName) => {
    const groupStudents = students.filter(
      (student) => student.group_name === groupName
    );
    const groupEvents = groupStudents.flatMap((student) =>
      Object.values(student.events)
    );

    const groupCompleted = groupEvents.filter(
      (event) => event.status === "зачет"
    ).length;
    const groupTotalEvents = groupEvents.length;

    return {
      name: groupName,
      total: groupStudents.length,
      completed: groupCompleted,
      completionRate:
        groupTotalEvents > 0 ? (groupCompleted / groupTotalEvents) * 100 : 0,
      averageScore:
        groupTotalEvents > 0
          ? groupEvents.reduce((sum, event) => sum + event.total_score, 0) /
            groupTotalEvents
          : 0,
    };
  });

  // Статистика по мероприятиям
  const eventStats = allEvents.map((eventId) => {
    const eventName = students[0]?.events[eventId]?.event_name || "Неизвестно";
    const eventData = students
      .map((student) => student.events[eventId])
      .filter(Boolean);

    const completedInEvent = eventData.filter(
      (event) => event.status === "зачет"
    ).length;
    const averageEventScore =
      eventData.reduce((sum, event) => sum + event.total_score, 0) /
      eventData.length;

    return {
      id: eventId,
      name: eventName,
      total: eventData.length,
      completed: completedInEvent,
      completionRate: (completedInEvent / eventData.length) * 100,
      averageScore: averageEventScore,
    };
  });

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Сводная статистика
      </h2>

      {/* Общая статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-900/30 rounded-lg p-4 text-center border border-blue-500/30">
          <div className="text-2xl font-bold text-blue-400">
            {groups.length}
          </div>
          <div className="text-gray-300 text-sm">Классов</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{totalStudents}</div>
          <div className="text-gray-300 text-sm">Учеников</div>
        </div>

        <div className="bg-green-900/30 rounded-lg p-4 text-center border border-green-500/30">
          <div className="text-2xl font-bold text-green-400">
            {completionRate.toFixed(1)}%
          </div>
          <div className="text-gray-300 text-sm">Успешных мероприятий</div>
        </div>

        <div className="bg-yellow-900/30 rounded-lg p-4 text-center border border-yellow-500/30">
          <div className="text-2xl font-bold text-yellow-400">
            {averageScore.toFixed(1)}
          </div>
          <div className="text-gray-300 text-sm">Средний балл</div>
        </div>
      </div>

      {/* Статистика по классам */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-white">
          Статистика по классам
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupStats.map((group, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="font-medium text-white mb-3 text-sm">
                {group.name}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Учеников:</span>
                  <span className="text-white font-semibold">
                    {group.total}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Успешных:</span>
                  <span className="text-green-400 font-semibold">
                    {group.completionRate.toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Средний балл:</span>
                  <span className="text-yellow-400 font-semibold">
                    {group.averageScore.toFixed(1)}
                  </span>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${group.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Статистика по мероприятиям */}
      {eventStats.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-white">
            Эффективность мероприятий
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventStats.map((event, index) => (
              <div key={event.id} className="bg-gray-700 rounded-lg p-4">
                <div
                  className="font-medium text-white mb-2 text-sm truncate"
                  title={event.name}
                >
                  {event.name}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Успешных:</span>
                    <span className="text-green-400 font-semibold">
                      {event.completed}/{event.total}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Средний балл:</span>
                    <span className="text-yellow-400 font-semibold">
                      {event.averageScore.toFixed(1)}
                    </span>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${event.completionRate}%` }}
                    ></div>
                  </div>

                  <div className="text-right text-xs text-gray-400">
                    {event.completionRate.toFixed(1)}% успешности
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PivotStats;
