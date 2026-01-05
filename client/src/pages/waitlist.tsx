import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { MetaHead } from "@/components/MetaHead";
import { brandIdentity, pricing, seo } from "@/content/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SubmissionState = "idle" | "submitting" | "submitted" | "needs-email-client" | "error";

const WEBHOOK_URL = (import.meta.env.VITE_WAITLIST_WEBHOOK_URL ?? "").trim();

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

    if (WEBHOOK_URL) {
      try {
        setState("submitting");
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        setState("submitted");
        return;
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        setState("error");
        return;
      }
    }

    const subject = encodeURIComponent("26weeks.ai waitlist signup");
    const bodyLines = [
      "Please add me to the 26weeks.ai waitlist.",
      "",
      `Email: ${normalizedEmail}`,
      normalizedName ? `Name: ${normalizedName}` : undefined,
      selectedPlan ? `Interested plan: ${selectedPlan.name}` : undefined,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailto = `mailto:${brandIdentity.contactEmail}?subject=${subject}&body=${body}`;

    setState("needs-email-client");
    setTimeout(() => {
      window.location.href = mailto;
    }, 0);
  };

  return (
    <>
      <MetaHead {...seo.waitlist} />
      <div className="min-h-screen bg-neutral-950 text-white">
        <header className="border-b border-neutral-900 bg-gradient-to-b from-neutral-950 to-neutral-900/60">
          <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-orange-400 hover:text-orange-200 hover:bg-orange-500/15 focus-visible:ring-orange-500/60"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Button>
            </Link>
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-semibold text-balance">Join the waitlist</h1>
              <p className="text-neutral-300 text-balance">
                Get launch updates, training drops, and early access invites. No spam.
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <div className="rounded-3xl border border-neutral-900 bg-neutral-900/40 p-8">
            {state === "submitted" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-semibold">You’re on the list</h2>
                </div>
                <p className="text-neutral-300">
                  {WEBHOOK_URL
                    ? "Thanks! We’ll email you when we’re ready."
                    : "Your email app should open. Hit send to confirm your signup."}
                </p>
                <div>
                  <Link href="/">
                    <Button className="bg-orange-500 text-neutral-950 hover:bg-orange-400 focus-visible:ring-orange-500">
                      Back to home
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-200">
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
                    className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-200">
                    Name <span className="text-neutral-500">(optional)</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan" className="text-neutral-200">
                    Plan interest <span className="text-neutral-500">(optional)</span>
                  </Label>
                  <select
                    id="plan"
                    name="plan"
                    value={planId}
                    onChange={(event) => setPlanId(event.target.value)}
                    className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
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
                  <div className="rounded-xl border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-200">
                    {errorMessage}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    disabled={state === "submitting"}
                    className="bg-orange-500 text-neutral-950 hover:bg-orange-400 focus-visible:ring-orange-500 disabled:opacity-60"
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

                  {!WEBHOOK_URL && (
                    <a
                      href={`mailto:${brandIdentity.contactEmail}`}
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white"
                    >
                      <Mail className="h-4 w-4" /> Prefer email? {brandIdentity.contactEmail}
                    </a>
                  )}
                </div>

                <p className="text-xs text-neutral-500">
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
