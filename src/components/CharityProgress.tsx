
import { Progress } from "@/components/ui/progress";

export function CharityProgress() {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="text-sm font-medium">Charity goal</span>
      <div className="flex-1">
        <Progress value={35} className="h-2 bg-gray-200" />
      </div>
      <span className="text-sm font-medium text-[#1E7B3E]">35%</span>
    </div>
  );
}