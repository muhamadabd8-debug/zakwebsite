export type ContactSubmission = {
  name: string;
  company: string;
  workEmail: string;
  phone: string;
  opportunity: string;
  projectLocation: string;
  requiredCapability: string;
  projectStage: string;
  message: string;
  requestCorporateProfile: boolean;
  requestPrequalification: boolean;
};

export type ContactAdapterResult = { ok: true } | { ok: false; error: string };

/**
 * Typed delivery adapter for the enquiry form.
 *
 * No CRM or mail credentials were supplied with this project. Set
 * CONTACT_FORM_WEBHOOK_URL (see .env.example) to route enquiries to a real
 * intake endpoint, or replace this function with a provider SDK call.
 * Until configured, submissions are logged server-side so nothing is silently
 * dropped in development — this must be wired before launch.
 */
export async function deliverContactSubmission(
  submission: ContactSubmission
): Promise<ContactAdapterResult> {
  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[contact] CONTACT_FORM_WEBHOOK_URL is not configured — submission logged only.",
      { company: submission.company, capability: submission.requiredCapability }
    );
    return { ok: true };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    if (!res.ok) return { ok: false, error: `Endpoint responded ${res.status}` };
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not reach delivery endpoint" };
  }
}
