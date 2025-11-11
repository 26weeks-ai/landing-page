import { Button } from '@/components/ui/button';

export const WAITLIST_FORM_URL = 'https://forms.gle/26weeksWaitlist';

export default function WaitlistForm() {
  return (
    <Button
      asChild
      className="w-full sm:w-auto bg-orange-500 text-neutral-950 font-semibold shadow-lg shadow-orange-500/30 hover:bg-orange-400 focus-visible:ring-orange-500 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] px-6 py-5 text-base"
    >
      <a href={WAITLIST_FORM_URL} target="_blank" rel="noopener noreferrer">
        Join Waitlist
      </a>
    </Button>
  );
}
