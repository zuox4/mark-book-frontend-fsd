import { Mark } from "@/pages/student/mark-book/markBookPage";
import MarkCard from "./MarkCard";

interface MarkListProps {
  marks: Mark[];
  expandedCard: number | null;
  onToggleCard: (id: number) => void;
}

function MarkList({ marks, expandedCard, onToggleCard }: MarkListProps) {
  return (
    <div className="space-y-3">
      {marks.map((mark) => (
        <MarkCard
          key={mark.id}
          mark={mark}
          isExpanded={expandedCard === mark.id}
          onToggle={() => onToggleCard(mark.id)}
        />
      ))}
    </div>
  );
}
export default MarkList;
