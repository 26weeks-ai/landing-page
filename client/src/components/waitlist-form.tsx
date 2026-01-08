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
        "h-11 w-full sm:w-auto rounded-xl px-6 text-sm font-semibold shadow-none",
        className,
      )}
      onClick={() => setLocation(href)}
    >
      {label}
    </Button>
  );
}
