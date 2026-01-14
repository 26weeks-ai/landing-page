import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/brand";
import { useEffect, useState } from "react";
import { Masthead } from "@/components/editorial/masthead";

export default function FAQ() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section 
      id="faq"
      className="py-20 scroll-mt-28"
      aria-label="Frequently asked questions about 26weeks.ai"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Masthead
          kicker="FAQ"
          stamp="CHAPTER 06"
          title={
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
              Frequently asked questions
            </h2>
          }
          subtitle="Everything you need to know about our AI-powered marathon training."
        />

        <motion.div 
          className="mt-12 mx-auto max-w-3xl"
          initial={prefersReducedMotion ? false : { y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { y: 0 }}
          viewport={prefersReducedMotion ? undefined : { once: true }}
          transition={prefersReducedMotion ? undefined : { delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? false : { y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { y: 0 }}
                viewport={prefersReducedMotion ? undefined : { once: true }}
                transition={prefersReducedMotion ? undefined : { delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="rounded-2xl border border-border bg-card px-5">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-base sm:text-lg font-semibold text-paper">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-paper-secondary">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
