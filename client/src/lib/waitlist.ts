import { brandIdentity } from "@/content/brand";

export type WaitlistPayload = {
  email: string;
  name?: string;
  planId?: string;
  planName?: string;
  source: string;
  createdAt: string;
};

export const WAITLIST_WEBHOOK_URL = (import.meta.env.VITE_WAITLIST_WEBHOOK_URL ?? "").trim();

export async function submitWaitlistWebhook(payload: WaitlistPayload) {
  if (!WAITLIST_WEBHOOK_URL) {
    throw new Error("Waitlist webhook URL is not configured.");
  }

  const response = await fetch(WAITLIST_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
}

export function createWaitlistMailto(payload: WaitlistPayload) {
  const subject = encodeURIComponent("26weeks.ai waitlist signup");
  const bodyLines = [
    "Please add me to the 26weeks.ai waitlist.",
    "",
    `Email: ${payload.email}`,
    payload.name ? `Name: ${payload.name}` : undefined,
    payload.planName ? `Interested plan: ${payload.planName}` : undefined,
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:${brandIdentity.contactEmail}?subject=${subject}&body=${body}`;
}

