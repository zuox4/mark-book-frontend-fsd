import React from "react";
import { GroupListFilterProps } from "./filtres";

const GroupListFilter: React.FC<GroupListFilterProps> = ({
  groups,
  selectedGroupId,
  setGroupId,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Выберите класс</h3>
      <div className="flex flex-wrap gap-2">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => setGroupId(group.id)}
            className={`
              cursor-pointer border-1 rounded-lg p-1 text-center transition-all
              ${
                selectedGroupId === group.id
                  ? "border-sch-green-light bg-sch-green-light bg-opacity-20 text-white"
                  : "border-gray-300 hover:border-gray-400 hover:bg-sch-blue-ultra"
              }
            `}
          >
            <div className="font-medium">{group.name}</div>
            {group.studentCount && (
              <div
                className={`text-xs mt-1 ${
                  selectedGroupId === group.id
                    ? "text-white text-opacity-80"
                    : "text-gray-500"
                }`}
              >
                {group.studentCount} уч.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupListFilter;
