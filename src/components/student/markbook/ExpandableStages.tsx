import { Stage } from "@/pages/student/mark-book/markBookPage";
import StageItem from "./StageItem";

// Компонент раскрывающейся части с этапами
export interface ExpandableStagesProps {
  isExpanded: boolean;
  stages: Stage[];
}

function ExpandableStages({ isExpanded, stages }: ExpandableStagesProps) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="border-t border-gray-100 p-4">
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <StageItem key={index} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ExpandableStages;
