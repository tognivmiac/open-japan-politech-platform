const BILL_STEPS = [
  { status: "SUBMITTED", label: "提出" },
  { status: "COMMITTEE", label: "委員会" },
  { status: "PLENARY", label: "本会議" },
  { status: "PASSED_LOWER", label: "衆院可決" },
  { status: "PASSED_UPPER", label: "参院可決" },
  { status: "ENACTED", label: "成立" },
];

interface BillTimelineProps {
  currentStatus: string;
}

export function BillTimeline({ currentStatus }: BillTimelineProps) {
  const currentIndex = BILL_STEPS.findIndex((s) => s.status === currentStatus);
  const isRejected = currentStatus === "REJECTED";
  const isWithdrawn = currentStatus === "WITHDRAWN";

  return (
    <div className="flex items-center gap-1">
      {BILL_STEPS.map((step, i) => {
        const isCompleted = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step.status} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                  isCompleted
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                    : "bg-white/[0.06] text-[#6b7280]"
                } ${isCurrent ? "ring-2 ring-indigo-400/50 ring-offset-2 ring-offset-[#0f0f23]" : ""}`}
              >
                {isCompleted ? "\u2713" : i + 1}
              </div>
              <span
                className={`mt-1 text-[10px] ${isCompleted ? "font-medium text-indigo-300" : "text-[#6b7280]"}`}
              >
                {step.label}
              </span>
            </div>
            {i < BILL_STEPS.length - 1 && (
              <div
                className={`mx-1 h-0.5 w-4 ${i < currentIndex ? "bg-indigo-600" : "bg-white/[0.08]"}`}
              />
            )}
          </div>
        );
      })}
      {(isRejected || isWithdrawn) && (
        <div className="ml-2 flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15 text-xs font-medium text-red-400">
            {"\u2715"}
          </div>
          <span className="mt-1 text-[10px] font-medium text-red-400">
            {isRejected ? "否決" : "撤回"}
          </span>
        </div>
      )}
    </div>
  );
}
