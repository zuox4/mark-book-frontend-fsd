import { Stage } from "@/pages/student/mark-book/markBookPage";
import StatusBadge from "./StatusBadge";

// Компонент этапа мероприятия
export interface StageItemProps {
  stage: Stage;
}

function StageItem({ stage }: StageItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded border border-gray-200 bg-gradient-to-r cursor-pointer from-sch-green-light/10 to-sch-green-light/5 transition-all duration-200 hover:from-sch-green-light/15 hover:to-sch-green-light/10">
      <div className="flex-1 items-center flex gap-2">
        <h4 className="font-codec-bold text-white">{stage.name}</h4>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-codec text-white text-sm">
          {stage.score}/{stage.maxScore}
        </span>
        <StatusBadge status={stage.status} text={stage.status} size="sm" />
      </div>
    </div>
  );
}
export default StageItem;
