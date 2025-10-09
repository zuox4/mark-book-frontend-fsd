import { useCallback } from "react";
import * as XLSX from "xlsx";
import { PivotStudent } from "./useProjectOfficePivot";

interface ExportData {
  students: PivotStudent[];
  fileName?: string;
}

// Функция для сохранения файла (замена file-saver)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveFile = (buffer: any, fileName: string) => {
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const useExcelExport = () => {
  const exportToExcel = useCallback(
    ({ students, fileName = "students_data" }: ExportData) => {
      if (!students || students.length === 0) {
        alert("Нет данных для выгрузки");
        return;
      }

      try {
        // Создаем новую книгу Excel
        const workbook = XLSX.utils.book_new();

        // Группируем студентов по классам
        const groups = [
          ...new Set(students.map((student) => student.group_name)),
        ];

        // Создаем лист для каждого класса
        groups.forEach((groupName) => {
          const groupStudents = students.filter(
            (student) => student.group_name === groupName
          );

          // Подготавливаем данные для листа
          const worksheetData = prepareGroupSheetData(groupStudents);

          // Создаем лист
          const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

          // Добавляем лист в книгу (имя листа ограничено 31 символом)
          const safeSheetName = groupName
            .replace(/[\\/*[\]:?]/g, "")
            .substring(0, 31);
          XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);
        });

        // Создаем сводный лист
        const summaryWorksheetData = prepareSummarySheetData(students);
        const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryWorksheetData);
        XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Сводка");

        // Генерируем файл и скачиваем
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        const finalFileName = `${fileName}_${new Date().toISOString().split("T")[0]}.xlsx`;
        saveFile(excelBuffer, finalFileName);
      } catch (error) {
        console.error("Ошибка при выгрузке в Excel:", error);
        alert("Произошла ошибка при выгрузке файла");
      }
    },
    []
  );

  return { exportToExcel };
};

// Функция для подготовки данных листа класса
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareGroupSheetData = (students: PivotStudent[]): any[][] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[][] = [];

  // Заголовок
  data.push(["Отчет по классу", students[0]?.group_name || ""]);
  data.push(["Дата выгрузки", new Date().toLocaleDateString("ru-RU")]);
  data.push([]);

  // Получаем все мероприятия
  const allEvents = students.length > 0 ? Object.keys(students[0].events) : [];

  // Заголовки таблицы
  const headers = [
    "№",
    "ФИО ученика",
    ...allEvents.flatMap((eventId) => {
      const event = students[0]?.events[eventId];
      return [
        `${event?.event_name} - Общий балл`,
        `${event?.event_name} - Статус`,
        `${event?.event_name} - Завершено стадий`,
      ];
    }),
  ];
  data.push(headers);

  // Данные студентов
  students.forEach((student, index) => {
    const row = [index + 1, student.student_name];

    allEvents.forEach((eventId) => {
      const event = student.events[eventId];
      if (event) {
        row.push(
          event.total_score,
          event.status,
          `${event.completed_stages_count}/${event.min_stages_required}`
        );
      } else {
        row.push("", "Нет данных", "");
      }
    });

    data.push(row);
  });

  return data;
};

// Функция для подготовки сводного листа
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareSummarySheetData = (students: PivotStudent[]): any[][] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[][] = [];

  // Заголовок
  data.push(["Сводный отчет по проектному офису"]);
  data.push(["Дата выгрузки", new Date().toLocaleDateString("ru-RU")]);
  data.push(["Всего учеников", students.length]);
  data.push([]);

  // Статистика по классам
  data.push(["Статистика по классам"]);
  data.push([
    "Класс",
    "Кол-во учеников",
    "Успешных мероприятий",
    "Средний балл",
    "Процент успешности",
  ]);

  const groups = [...new Set(students.map((student) => student.group_name))];
  groups.forEach((groupName) => {
    const groupStudents = students.filter(
      (student) => student.group_name === groupName
    );
    const totalEvents = groupStudents.reduce(
      (sum, student) => sum + Object.keys(student.events).length,
      0
    );
    const completedEvents = groupStudents.reduce(
      (sum, student) =>
        sum +
        Object.values(student.events).filter(
          (event) => event.status === "зачет"
        ).length,
      0
    );
    const averageScore =
      totalEvents > 0
        ? groupStudents.reduce(
            (sum, student) =>
              sum +
              Object.values(student.events).reduce(
                (eventSum, event) => eventSum + event.total_score,
                0
              ),
            0
          ) / totalEvents
        : 0;

    data.push([
      groupName,
      groupStudents.length,
      completedEvents,
      averageScore.toFixed(2),
      totalEvents > 0
        ? `${((completedEvents / totalEvents) * 100).toFixed(1)}%`
        : "0%",
    ]);
  });

  data.push([]);

  // Статистика по мероприятиям
  data.push(["Статистика по мероприятиям"]);
  data.push([
    "Мероприятие",
    "Участвовало учеников",
    "Зачтено",
    "В процессе",
    "Не начато",
    "Средний балл",
  ]);

  if (students.length > 0) {
    const allEvents = Object.keys(students[0].events);
    allEvents.forEach((eventId) => {
      const eventName = students[0].events[eventId].event_name;
      const eventStudents = students.filter(
        (student) => student.events[eventId]
      );
      const completed = eventStudents.filter(
        (student) => student.events[eventId]?.status === "зачет"
      ).length;
      const inProgress = eventStudents.filter(
        (student) => student.events[eventId]?.status === "в процессе"
      ).length;
      const notStarted = eventStudents.filter(
        (student) => student.events[eventId]?.status === "не начато"
      ).length;
      const averageScore =
        eventStudents.length > 0
          ? eventStudents.reduce(
              (sum, student) =>
                sum + (student.events[eventId]?.total_score || 0),
              0
            ) / eventStudents.length
          : 0;

      data.push([
        eventName,
        eventStudents.length,
        completed,
        inProgress,
        notStarted,
        averageScore.toFixed(2),
      ]);
    });
  }

  return data;
};
