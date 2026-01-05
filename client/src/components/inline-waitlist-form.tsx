import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  createWaitlistMailto,
  submitWaitlistWebhook,
  WAITLIST_WEBHOOK_URL,
} from "@/lib/waitlist";
import { brandIdentity } from "@/content/brand";

type SubmissionState = "idle" | "submitting" | "submitted" | "needs-email-client" | "error";

interface InlineWaitlistFormProps {
  source?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  compactNote?: boolean;
}

export default function InlineWaitlistForm({
  source = "home-hero",
  className,
  label = "Join waitlist",
  placeholder = "you@example.com",
  compactNote = false,
}: InlineWaitlistFormProps) {
  const instanceId = useId();
  const emailId = `${instanceId}-waitlist-email`;
  const companyId = `${instanceId}-waitlist-company`;

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (company.trim()) {
      setState("submitted");
      return;
    }

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setErrorMessage("Please enter an email address.");
      setState("error");
      return;
    }

    const payload = {
      email: normalizedEmail,
      source,
      createdAt: new Date().toISOString(),
    };

    if (WAITLIST_WEBHOOK_URL) {
      try {
        setState("submitting");
        await submitWaitlistWebhook(payload);
        setState("submitted");
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
        setState("error");
      }
      return;
    }

    setState("needs-email-client");
    const mailto = createWaitlistMailto({ ...payload, email: normalizedEmail });
    setTimeout(() => {
      window.location.href = mailto;
    }, 0);
  };

  if (state === "submitted" || state === "needs-email-client") {
    return (
      <div className={cn("rounded-2xl border border-border bg-card p-4 shadow-elev-1", className)}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-chart-3" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-medium text-foreground">You’re on the list.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {WAITLIST_WEBHOOK_URL
                ? "We’ll email you when we’re ready."
                : "Your email app should open — hit send to confirm your signup."}
            </p>
            {!WAITLIST_WEBHOOK_URL && (
              <a
                href={`mailto:${brandIdentity.contactEmail}`}
                className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Prefer email? {brandIdentity.contactEmail}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Label htmlFor={emailId} className="sr-only">
            Email
          </Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            className="h-12 rounded-full px-5 text-base"
          />
        </div>

        <Button type="submit" disabled={state === "submitting"} className="h-12 rounded-full px-6 text-base">
          {state === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Joining…
            </>
          ) : (
            label
          )}
        </Button>
      </div>

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor={companyId}>Company</Label>
        <Input
          id={companyId}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-destructive/60 bg-destructive/10 p-3 text-sm text-foreground">
          {errorMessage}
        </div>
      )}

      <p className={cn("text-xs text-subtle", compactNote ? "sm:text-right" : undefined)}>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
