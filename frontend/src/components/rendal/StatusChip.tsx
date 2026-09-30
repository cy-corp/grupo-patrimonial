import { cn } from "@/lib/utils";
import type { EmpreendimentoStatus } from "@/lib/rendal/content/empreendimentos";
import { STATUS_LABEL } from "@/lib/rendal/content/empreendimentos";

export function StatusChip({
  status,
  className,
}: {
  status: EmpreendimentoStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full bg-[#F8F1E3]/95 px-3 text-xs font-semibold text-[#7A4A2B]",
        className,
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
