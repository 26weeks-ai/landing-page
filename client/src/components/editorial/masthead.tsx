import { cn } from "@/lib/utils";
import { Hairline } from "@/components/editorial/hairline";
import { Kicker } from "@/components/editorial/kicker";

type MastheadAlign = "left" | "center";

export function Masthead({
  kicker,
  title,
  subtitle,
  stamp,
  align = "left",
  showRule = true,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  stamp?: string;
  align?: MastheadAlign;
  showRule?: boolean;
  className?: string;
}) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-4", alignClasses, className)}>
      <div className={cn("flex w-full flex-wrap items-baseline gap-x-4 gap-y-2", align === "center" ? "justify-center" : "justify-between")}>
        <Kicker>{kicker}</Kicker>
        {stamp ? (
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
            {stamp}
          </span>
        ) : null}
      </div>

      <div>
        <div className={cn("font-serif font-semibold tracking-[-0.02em] text-paper", align === "center" ? "mx-auto" : "")}>
          {title}
        </div>
        {subtitle ? (
          <p className={cn("mt-4 max-w-2xl text-base leading-relaxed text-paper-secondary", align === "center" ? "mx-auto" : "")}>
            {subtitle}
          </p>
        ) : null}
      </div>

      {showRule ? <Hairline className={cn("opacity-70", align === "center" ? "mx-auto max-w-2xl" : "")} /> : null}
    </div>
  );
}

