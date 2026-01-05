import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { MetaHead } from "@/components/MetaHead";
import { brandIdentity, pricing, seo } from "@/content/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWaitlistMailto, submitWaitlistWebhook, WAITLIST_WEBHOOK_URL } from "@/lib/waitlist";

type SubmissionState = "idle" | "submitting" | "submitted" | "needs-email-client" | "error";

export default function WaitlistPage() {
  const [location] = useLocation();
  const planFromUrl = useMemo(() => {
    const query = location.split("?")[1] ?? "";
    return new URLSearchParams(query).get("plan") ?? "";
  }, [location]);

  const knownPlanIds = useMemo(() => new Set(pricing.plans.map((plan) => plan.id)), []);
  const initialPlanId = knownPlanIds.has(planFromUrl) ? planFromUrl : "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [planId, setPlanId] = useState<string>(initialPlanId);
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedPlan = pricing.plans.find((plan) => plan.id === planId);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (company.trim()) {
      setState("submitted");
      return;
    }

    const normalizedEmail = email.trim();
    const normalizedName = name.trim();

    if (!normalizedEmail) {
      setErrorMessage("Please enter an email address.");
      setState("error");
      return;
    }

    const payload = {
      email: normalizedEmail,
      name: normalizedName || undefined,
      planId: planId || undefined,
      planName: selectedPlan?.name || undefined,
      source: "landing-page",
      createdAt: new Date().toISOString(),
    };

    if (WAITLIST_WEBHOOK_URL) {
      try {
        setState("submitting");
        await submitWaitlistWebhook(payload);
        setState("submitted");
        return;
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        setState("error");
        return;
      }
    }

    setState("needs-email-client");
    const mailto = createWaitlistMailto(payload);
    setTimeout(() => {
      window.location.href = mailto;
    }, 0);
  };

  return (
    <>
      <MetaHead {...seo.waitlist} />
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border bg-gradient-to-b from-background to-card/30">
          <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-ring hover:text-ring/90 hover:bg-ring/10 focus-visible:ring-ring/60"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Button>
            </Link>
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-semibold text-balance">Join the waitlist</h1>
              <p className="text-muted-foreground text-balance">
                Get launch updates, training drops, and early access invites. No spam.
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elev-2">
            {state === "submitted" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-chart-3" />
                  <h2 className="text-xl font-semibold">You’re on the list</h2>
                </div>
                <p className="text-muted-foreground">
                  {WAITLIST_WEBHOOK_URL
                    ? "Thanks! We’ll email you when we’re ready."
                    : "Your email app should open. Hit send to confirm your signup."}
                </p>
                <div>
                  <Link href="/">
                    <Button>Back to home</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name <span className="text-subtle">(optional)</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan" className="text-foreground">
                    Plan interest <span className="text-subtle">(optional)</span>
                  </Label>
                  <select
                    id="plan"
                    name="plan"
                    value={planId}
                    onChange={(event) => setPlanId(event.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-foreground ring-offset-background transition-colors hover:border-[hsl(var(--input-hover))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">No preference</option>
                    {pricing.plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} — ${plan.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-destructive/60 bg-destructive/10 p-4 text-sm text-foreground">
                    {errorMessage}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    disabled={state === "submitting"}
                    className="disabled:opacity-60"
                  >
                    {state === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining…
                      </>
                    ) : (
                      "Join waitlist"
                    )}
                  </Button>

                  {!WAITLIST_WEBHOOK_URL && (
                    <a
                      href={`mailto:${brandIdentity.contactEmail}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Mail className="h-4 w-4" /> Prefer email? {brandIdentity.contactEmail}
                    </a>
                  )}
                </div>

                <p className="text-xs text-subtle">
                  By joining, you agree to receive occasional emails about 26weeks.ai. You can unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
