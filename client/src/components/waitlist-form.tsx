import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const WAITLIST_FORM_URL = 'https://forms.gle/26weeksWaitlist';

export default function WaitlistForm() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
        <a
          href={WAITLIST_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the waitlist form in a new tab"
        >
          Join Waitlist
        </a>
      </Button>
    </motion.div>
  );
}
