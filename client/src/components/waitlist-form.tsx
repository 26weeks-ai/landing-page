import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { brandIdentity } from "@/content/brand";
import { useLocation } from "wouter";

export const WAITLIST_PATH = brandIdentity.links.waitlist;

interface WaitlistFormProps {
  label?: string;
  planId?: string;
  className?: string;
}

export default function WaitlistForm({
  label = "Join Waitlist",
  planId,
  className,
}: WaitlistFormProps) {
  const [, setLocation] = useLocation();
  const href = planId ? `${WAITLIST_PATH}?plan=${encodeURIComponent(planId)}` : WAITLIST_PATH;

  return (
    <Button
      type="button"
      className={cn(
        "w-full sm:w-auto bg-orange-500 text-neutral-950 font-semibold shadow-lg shadow-orange-500/30 hover:bg-orange-400 focus-visible:ring-orange-500 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] px-6 py-5 text-base",
        className,
      )}
      onClick={() => setLocation(href)}
    >
      {label}
    </Button>
  );
}
