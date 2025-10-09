// components/project-office/StudentDetailsModal.tsx
import { PivotStudent } from "@/hooks/teacher/useProjectOfficePivot";
import React from "react";

interface StudentDetailsModalProps {
  student: PivotStudent | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Детальная информация об ученике
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {student.group_name} • {Object.keys(student.events).length}{" "}
              мероприятий
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Основная информация */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Блок информации об ученике */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Ученик</h3>
              <div className="space-y-2">
                <div>
                  <div className="text-gray-400 text-sm">ФИО</div>
                  <div className="text-white font-medium">
                    {student.student_name}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Класс</div>
                  <div className="text-blue-300 font-medium">
                    {student.group_name}
                  </div>
                </div>
                {student.class_teacher && (
                  <div>
                    <div className="text-gray-400 text-sm">
                      Классный руководитель
                    </div>
                    <div className="text-gray-300">{student.class_teacher}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Общая статистика ученика */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">
                Общая статистика
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Мероприятий:</span>
                  <span className="text-white font-bold">
                    {Object.keys(student.events).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Зачтено:</span>
                  <span className="text-green-400 font-bold">
                    {
                      Object.values(student.events).filter(
                        (e) => e.status === "зачет"
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">В процессе:</span>
                  <span className="text-yellow-400 font-bold">
                    {
                      Object.values(student.events).filter(
                        (e) => e.status === "в процессе"
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Средний балл:</span>
                  <span className="text-blue-400 font-bold">
                    {(
                      Object.values(student.events).reduce(
                        (sum, e) => sum + e.total_score,
                        0
                      ) / Object.keys(student.events).length
                    ).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Прогресс */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-3">Прогресс</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Успешность:</span>
                  <span className="text-green-400 font-medium">
                    {(
                      (Object.values(student.events).filter(
                        (e) => e.status === "зачет"
                      ).length /
                        Object.keys(student.events).length) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${
                        (Object.values(student.events).filter(
                          (e) => e.status === "зачет"
                        ).length /
                          Object.keys(student.events).length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Детали по мероприятиям */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              Результаты по мероприятиям
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(student.events).map(([eventId, event]) => (
                <div
                  key={eventId}
                  className={`border rounded-lg p-4 ${
                    event.status === "зачет"
                      ? "border-green-500 bg-green-500/10"
                      : event.status === "в процессе"
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-gray-600 bg-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-white text-sm">
                      {event.event_name}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        event.status === "зачет"
                          ? "bg-green-500 text-white"
                          : event.status === "в процессе"
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-500 text-white"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Общий балл:</span>
                      <span className="text-white font-medium">
                        {event.total_score}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Стадии:</span>
                      <span className="text-gray-300">
                        {event.completed_stages_count}/
                        {event.min_stages_required}
                      </span>
                    </div>

                    {/* Детали по стадиям */}
                    <div className="mt-3">
                      <div className="text-gray-400 text-xs mb-2">Стадии:</div>
                      <div className="space-y-1">
                        {event.stages.map((stage, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-300">{stage.name}:</span>
                            <span
                              className={
                                stage.status === "зачет"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }
                            >
                              {stage.current_score}б ({stage.status})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="flex justify-end p-4 border-t border-gray-700 bg-gray-800 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
